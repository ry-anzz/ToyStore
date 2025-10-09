package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.dto.AvaliacaoResponse;
import com.lojabrinquedo.loja.model.Avaliacao;
import com.lojabrinquedo.loja.model.Categoria;
import com.lojabrinquedo.loja.model.Marca;
import com.lojabrinquedo.loja.model.Produto;
import com.lojabrinquedo.loja.repository.AvaliacaoRepository;
import com.lojabrinquedo.loja.repository.CategoriaRepository;
import com.lojabrinquedo.loja.repository.MarcaRepository;
import com.lojabrinquedo.loja.repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;
    private final MarcaRepository marcaRepository;
    private final CategoriaRepository categoriaRepository;
    private final AvaliacaoRepository avaliacaoRepository;

    public ProdutoController(ProdutoRepository produtoRepository, MarcaRepository marcaRepository, CategoriaRepository categoriaRepository, AvaliacaoRepository avaliacaoRepository) {
        this.produtoRepository = produtoRepository;
        this.marcaRepository = marcaRepository;
        this.categoriaRepository = categoriaRepository;
        this.avaliacaoRepository = avaliacaoRepository;
    }

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    // A anotação @SuppressWarnings foi removida daqui
    private Produto preencherProduto(Map<String, Object> payload, Produto produto) {
        Object marcaObj = payload.get("marca");
        if (!(marcaObj instanceof Map)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Objeto 'marca' inválido no payload.");
        }
        Map<?, ?> marcaMap = (Map<?, ?>) marcaObj;
        Object marcaIdObj = marcaMap.get("id");
        if (marcaIdObj == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "'id' da marca não encontrado.");
        }
        Long marcaId = Long.valueOf(marcaIdObj.toString());

        Object categoriaObj = payload.get("categoria");
        if (!(categoriaObj instanceof Map)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Objeto 'categoria' inválido no payload.");
        }
        Map<?, ?> categoriaMap = (Map<?, ?>) categoriaObj;
        Object categoriaIdObj = categoriaMap.get("id");
        if (categoriaIdObj == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "'id' da categoria não encontrado.");
        }
        Long categoriaId = Long.valueOf(categoriaIdObj.toString());

        Marca marca = marcaRepository.findById(marcaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marca com ID " + marcaId + " não encontrada."));
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoria com ID " + categoriaId + " não encontrada."));

        produto.setNome((String) payload.get("nome"));
        produto.setDescricao((String) payload.get("descricao"));
        produto.setValor(new BigDecimal(payload.get("valor").toString()));
        produto.setImagemUrl((String) payload.get("imagem_url"));
        produto.setQuantidadeEstoque(Integer.parseInt(payload.get("quantidadeEstoque").toString()));
        produto.setMarca(marca);
        produto.setCategoria(categoria);

        return produto;
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody Map<String, Object> payload) {
        String nomeProduto = (String) payload.get("nome");
        if (produtoRepository.existsByNome(nomeProduto)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Um produto com este nome já está cadastrado.");
        }

        Produto novoProduto = preencherProduto(payload, new Produto());
        return new ResponseEntity<>(produtoRepository.save(novoProduto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        return produtoRepository.findById(id)
                .map(produtoExistente -> {
                    Produto produtoAtualizado = preencherProduto(payload, produtoExistente);
                    return ResponseEntity.ok(produtoRepository.save(produtoAtualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) return ResponseEntity.notFound().build();
        produtoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return produtoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/avaliacoes")
    public List<AvaliacaoResponse> buscarAvaliacoesDoProduto(@PathVariable Long id) {
        List<Avaliacao> avaliacoes = avaliacaoRepository.findByProdutoId(id);
        return avaliacoes.stream()
                         .map(AvaliacaoResponse::new)
                         .collect(Collectors.toList());
    }
}