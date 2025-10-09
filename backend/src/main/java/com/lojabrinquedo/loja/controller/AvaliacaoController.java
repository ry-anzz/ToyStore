// 1. ADICIONE A DECLARAÇÃO DO PACOTE NO TOPO
package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Avaliacao;
import com.lojabrinquedo.loja.model.Produto;
import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.AvaliacaoRepository;
import com.lojabrinquedo.loja.repository.ProdutoRepository;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {

    private final AvaliacaoRepository avaliacaoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProdutoRepository produtoRepository;

    public AvaliacaoController(AvaliacaoRepository avaliacaoRepository, UsuarioRepository usuarioRepository, ProdutoRepository produtoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
        this.usuarioRepository = usuarioRepository;
        this.produtoRepository = produtoRepository;
    }

    @PostMapping
    public ResponseEntity<Avaliacao> criarAvaliacao(@RequestBody Map<String, Object> payload) {
        Long usuarioId = Long.parseLong(payload.get("usuarioId").toString());
        Long produtoId = Long.parseLong(payload.get("produtoId").toString());
        Integer nota = Integer.parseInt(payload.get("nota").toString());
        String descricao = (String) payload.get("descricao");

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado."));

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado."));

        Avaliacao novaAvaliacao = new Avaliacao();
        novaAvaliacao.setUsuario(usuario);
        novaAvaliacao.setProduto(produto);
        novaAvaliacao.setNota(nota);
        novaAvaliacao.setDescricao(descricao);
        novaAvaliacao.setDataAvaliacao(LocalDate.now());

        Avaliacao avaliacaoSalva = avaliacaoRepository.save(novaAvaliacao);
        return new ResponseEntity<>(avaliacaoSalva, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Avaliacao> atualizarAvaliacao(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Long usuarioId = Long.parseLong(payload.get("usuarioId").toString());
        
        return avaliacaoRepository.findById(id)
            .map(avaliacaoExistente -> {
                if (!Objects.equals(avaliacaoExistente.getUsuario().getId(), usuarioId)) {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não tem permissão para editar esta avaliação.");
                }

                avaliacaoExistente.setNota(Integer.parseInt(payload.get("nota").toString()));
                avaliacaoExistente.setDescricao((String) payload.get("descricao"));
                avaliacaoExistente.setEditado(true);
                
                Avaliacao avaliacaoSalva = avaliacaoRepository.save(avaliacaoExistente);
                return ResponseEntity.ok(avaliacaoSalva);
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Avaliação não encontrada."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAvaliacao(@PathVariable Long id, @RequestParam Long usuarioId) {
        return avaliacaoRepository.findById(id)
            .map(avaliacaoExistente -> {
                if (!Objects.equals(avaliacaoExistente.getUsuario().getId(), usuarioId)) {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não tem permissão para excluir esta avaliação.");
                }
                
                avaliacaoRepository.deleteById(id);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Avaliação não encontrada."));
    }
}