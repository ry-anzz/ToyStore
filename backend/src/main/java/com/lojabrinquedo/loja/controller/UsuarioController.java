package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios") // Altere o mapeamento para incluir /api/
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder; // Injetado automaticamente pelo Spring Security

    public UsuarioController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<Usuario> listar() {
        // **NOTA:** ESTE MÉTODO DEVE SER PROTEGIDO POR SPRING SECURITY (APENAS ADMIN)
        return usuarioRepository.findAll();
    }

    /**
     * POST /api/usuarios
     * Endpoint de Cadastro: Hashea a senha antes de salvar.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criar(@RequestBody Usuario usuario) {
        String senhaHasheada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaHasheada);
        return usuarioRepository.save(usuario);
    }

    // Você precisará de um Controller de Autenticação separado (ex: AuthController.java)
    // para a lógica de login e geração de JWT, mas esta é a base de dados.
}