package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Categoria;
import com.lojabrinquedo.loja.model.Marca;
import com.lojabrinquedo.loja.model.Produto;
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

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;
    private final MarcaRepository marcaRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoController(ProdutoRepository produtoRepository, MarcaRepository marcaRepository, CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.marcaRepository = marcaRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    private Produto preencherProduto(Map<String, Object> payload, Produto produto) {
        // Extrai o ID da marca do payload
        Map<String, Integer> marcaMap = (Map<String, Integer>) payload.get("marca");
        Long marcaId = Long.valueOf(marcaMap.get("id"));

        // Extrai o ID da categoria do payload
        Map<String, Integer> categoriaMap = (Map<String, Integer>) payload.get("categoria");
        Long categoriaId = Long.valueOf(categoriaMap.get("id"));

        // Busca as entidades no banco
        Marca marca = marcaRepository.findById(marcaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Marca não encontrada"));
        Categoria categoria = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoria não encontrada"));

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
}