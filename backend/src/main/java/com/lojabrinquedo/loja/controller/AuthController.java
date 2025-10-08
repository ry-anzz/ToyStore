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
     * POST /api/auth/login - Verifica as credenciais.
     */
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginRequest request) {
        // 1. Busca o usuário pelo email (findByEmail é crucial e deve existir no UsuarioRepository)
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());

        if (usuarioOpt.isEmpty()) {
            // Lança 401 para não dar dicas sobre qual credencial falhou
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos.");
        }

        Usuario usuario = usuarioOpt.get();

        // 2. Verifica a senha (em texto puro, pois removemos a criptografia)
        if (usuario.getSenha().equals(request.getSenha())) {
            // Se as senhas baterem, retorna 200 OK e os dados do usuário (exceto a senha)
            return ResponseEntity.ok(usuario);
        } else {
            // Senha incorreta
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos.");
        }
    }
}