package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Endereco;
import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        if (usuarioRepository.existsByEmailOrCpf(usuario.getEmail(), usuario.getCpf())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "O CPF ou E-mail fornecido já está cadastrado.");
        }

        // --- LÓGICA ATUALIZADA ---
        if (usuario.getEnderecos() != null && !usuario.getEnderecos().isEmpty()) {
            for (Endereco endereco : usuario.getEnderecos()) {
                // 1. Associa o endereço ao usuário que está sendo criado
                endereco.setUsuario(usuario);
                
                // 2. Define o nome do destinatário como o nome do usuário
                endereco.setNomeDestinatario(usuario.getNome());
            }
        }

        Usuario novoUsuario = usuarioRepository.save(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }
}