package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.dto.PedidoResponse;
import com.lojabrinquedo.loja.model.*;
import com.lojabrinquedo.loja.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final EnderecoRepository enderecoRepository;
    private final ProdutoRepository produtoRepository;
    private final StatusPedidoRepository statusPedidoRepository;
    private final MetodoPagamentoRepository metodoPagamentoRepository;

    public PedidoController(PedidoRepository pedidoRepository, UsuarioRepository usuarioRepository, EnderecoRepository enderecoRepository, ProdutoRepository produtoRepository, StatusPedidoRepository statusPedidoRepository, MetodoPagamentoRepository metodoPagamentoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.enderecoRepository = enderecoRepository;
        this.produtoRepository = produtoRepository;
        this.statusPedidoRepository = statusPedidoRepository;
        this.metodoPagamentoRepository = metodoPagamentoRepository;
    }

    @PostMapping
    @Transactional
    @SuppressWarnings("unchecked")
    public ResponseEntity<PedidoResponse> criarPedido(@RequestBody Map<String, Object> payload) {
        Long usuarioId = Long.parseLong(payload.get("usuarioId").toString());
        Long enderecoId = Long.parseLong(payload.get("enderecoId").toString());
        Long metodoPagamentoId = Long.parseLong(payload.get("metodoPagamentoId").toString());

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
        Endereco endereco = enderecoRepository.findById(enderecoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Endereço não encontrado"));
        MetodoPagamento metodoPagamento = metodoPagamentoRepository.findById(metodoPagamentoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Método de pagamento não encontrado"));
        StatusPedido statusInicial = statusPedidoRepository.findByNome("Preparando pacote")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Status 'Preparando pacote' não configurado no banco."));

        Pedido novoPedido = new Pedido();
        novoPedido.setUsuario(usuario);
        novoPedido.setEndereco(endereco);
        novoPedido.setMetodoPagamento(metodoPagamento);
        novoPedido.setStatusPedido(statusInicial);

        List<ItensPedido> itens = new ArrayList<>();
        List<Map<String, Object>> itensPayload = (List<Map<String, Object>>) payload.get("itens");
        BigDecimal valorTotal = BigDecimal.ZERO;

        for (Map<String, Object> itemData : itensPayload) {
            Map<String, Object> produtoData = (Map<String, Object>) itemData.get("produto");
            Long produtoId = Long.parseLong(produtoData.get("id").toString());
            int quantidade = Integer.parseInt(itemData.get("quantidade").toString());

            Produto produto = produtoRepository.findById(produtoId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto com ID " + produtoId + " não encontrado."));

            ItensPedido itemPedido = new ItensPedido();
            itemPedido.setProduto(produto);
            itemPedido.setQuantidade(quantidade);
            itemPedido.setPrecoUnitario(produto.getValor());
            itemPedido.setPedido(novoPedido);
            itens.add(itemPedido);

            valorTotal = valorTotal.add(produto.getValor().multiply(new BigDecimal(quantidade)));
        }

        novoPedido.setItens(itens);
        novoPedido.setValorTotal(valorTotal);
        novoPedido.setValorFrete(BigDecimal.ZERO);

        Pedido pedidoSalvo = pedidoRepository.save(novoPedido);

        return new ResponseEntity<>(new PedidoResponse(pedidoSalvo), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PedidoResponse>> buscarTodosPedidos() {
        List<Pedido> pedidos = pedidoRepository.findAllByOrderByDataPedidoDesc();
        List<PedidoResponse> pedidosResponse = pedidos.stream()
                .map(PedidoResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(pedidosResponse);
    }

    // NOVO ENDPOINT PARA BUSCAR UM PEDIDO POR ID
    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> buscarPedidoPorId(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(pedido -> ResponseEntity.ok(new PedidoResponse(pedido)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<PedidoResponse>> buscarPedidosPorUsuario(@PathVariable Long usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            return ResponseEntity.notFound().build();
        }
        List<Pedido> pedidos = pedidoRepository.findByUsuarioIdOrderByDataPedidoDesc(usuarioId);
        List<PedidoResponse> pedidosResponse = pedidos.stream()
                .map(PedidoResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(pedidosResponse);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PedidoResponse> atualizarStatusPedido(@PathVariable Long id, @RequestBody Map<String, Long> payload) {
        Long statusId = payload.get("statusId");
        if (statusId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID do status é obrigatório.");
        }

        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado."));
        
        StatusPedido novoStatus = statusPedidoRepository.findById(statusId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status de pedido não encontrado."));

        pedido.setStatusPedido(novoStatus);
        Pedido pedidoAtualizado = pedidoRepository.save(pedido);

        return ResponseEntity.ok(new PedidoResponse(pedidoAtualizado));
    }
}