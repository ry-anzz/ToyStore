package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Produto;
import com.lojabrinquedo.loja.repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return produtoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    // **NOTA:** ESTE MÉTODO DEVE SER PROTEGIDO POR SPRING SECURITY (APENAS ADMIN)
    public Produto criar(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produtoDetalhes) {
        return produtoRepository.findById(id)
                .map(produtoExistente -> {
                    // Atualize todos os campos necessários aqui
                    produtoExistente.setNome(produtoDetalhes.getNome());
                    produtoExistente.setValor(produtoDetalhes.getValor());
                    produtoExistente.setDescricao(produtoDetalhes.getDescricao());
                    produtoExistente.setQuantidadeEstoque(produtoDetalhes.getQuantidadeEstoque());
                    // ... Lógica para Marca e Categoria (se houver) ...
                    
                    Produto produtoAtualizado = produtoRepository.save(produtoExistente);
                    return ResponseEntity.ok(produtoAtualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        produtoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}