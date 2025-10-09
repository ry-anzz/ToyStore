package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Marca;
import com.lojabrinquedo.loja.repository.MarcaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/marcas")
public class MarcaController {

    private final MarcaRepository marcaRepository;

    public MarcaController(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    @GetMapping
    public List<Marca> listarTodas() { return marcaRepository.findAll(); }

    @PostMapping
    public ResponseEntity<Marca> criar(@RequestBody Marca marca) {
        return new ResponseEntity<>(marcaRepository.save(marca), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Marca> atualizar(@PathVariable Long id, @RequestBody Marca dados) {
        return marcaRepository.findById(id)
                .map(existente -> {
                    existente.setNome(dados.getNome());
                    return ResponseEntity.ok(marcaRepository.save(existente));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!marcaRepository.existsById(id)) return ResponseEntity.notFound().build();
        marcaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}