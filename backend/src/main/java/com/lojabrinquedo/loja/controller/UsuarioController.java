package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
// REMOVIDO: import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios") 
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;
    // REMOVIDO: private final PasswordEncoder passwordEncoder; 

    // CONSTRUTOR CORRIGIDO: Aceita apenas o repositório
    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    /**
     * POST /api/usuarios - Cadastro
     * Salva a senha em texto puro (para demonstração de faculdade).
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criar(@RequestBody Usuario usuario) {
        // Lógica de Hashing REMOVIDA
        return usuarioRepository.save(usuario);
    }
}