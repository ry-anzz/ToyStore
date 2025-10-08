package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.auth.LoginRequest;
import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * POST /api/auth/login - Endpoint de login funcional.
     * Verifica as credenciais e retorna o usuário se a senha estiver correta.
     */
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginRequest request) {
        // 1. Busca o usuário pelo email
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());

        if (usuarioOpt.isEmpty()) {
            // Lança 404 (Not Found) se o email não existir
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Email ou senha inválidos.");
        }

        Usuario usuario = usuarioOpt.get();

        // 2. Verifica a senha (em texto puro, sem criptografia)
        if (usuario.getSenha().equals(request.getSenha())) {
            // Se as senhas baterem, retorna 200 OK e os dados do usuário
            return ResponseEntity.ok(usuario);
        } else {
            // Lança 401 (Unauthorized) se a senha estiver incorreta
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos.");
        }
    }
}