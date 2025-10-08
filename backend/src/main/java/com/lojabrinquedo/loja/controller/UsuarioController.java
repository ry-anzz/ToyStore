package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criar(@RequestBody Usuario usuario) {
        // --- ADICIONE ESTA LINHA PARA DEBUG ---
        System.out.println("--- TENTANDO CADASTRAR USUÁRIO: " + usuario.toString() + " ---");
        
        return usuarioRepository.save(usuario);
    }
    
    // O MÉTODO @ExceptionHandler FOI REMOVIDO DAQUI
}