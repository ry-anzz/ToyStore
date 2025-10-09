package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.MetodoPagamento;
import com.lojabrinquedo.loja.repository.MetodoPagamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/metodos-pagamento")
public class MetodoPagamentoController {

    private final MetodoPagamentoRepository repository;

    public MetodoPagamentoController(MetodoPagamentoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MetodoPagamento> listarTodos() { return repository.findAll(); }

    @PostMapping
    public ResponseEntity<MetodoPagamento> criar(@RequestBody MetodoPagamento metodo) {
        return new ResponseEntity<>(repository.save(metodo), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetodoPagamento> atualizar(@PathVariable Long id, @RequestBody MetodoPagamento dados) {
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