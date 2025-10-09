package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Banner;
import com.lojabrinquedo.loja.repository.BannerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

    private final BannerRepository repository;

    public BannerController(BannerRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Banner> listarTodos() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Banner> criar(@RequestBody Banner banner) {
        return new ResponseEntity<>(repository.save(banner), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}