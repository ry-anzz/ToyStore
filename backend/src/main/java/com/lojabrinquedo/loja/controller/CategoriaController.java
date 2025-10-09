package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Categoria;
import com.lojabrinquedo.loja.repository.CategoriaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaRepository repository;

    public CategoriaController(CategoriaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Categoria> listarTodas() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Categoria> criar(@RequestBody Categoria categoria) {
        return new ResponseEntity<>(repository.save(categoria), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizar(@PathVariable Long id, @RequestBody Categoria dados) {
        return repository.findById(id)
                .map(existente -> {
                    existente.setNome(dados.getNome());
                    return ResponseEntity.ok(repository.save(existente));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}