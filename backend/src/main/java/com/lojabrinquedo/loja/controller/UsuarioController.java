package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.dao.DataIntegrityViolationException; // IMPORT NOVO
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; // IMPORT NOVO
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map; // IMPORT NOVO

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

    /**
     * POST /api/usuarios - Cadastro
     * O método 'criar' está funcional, mas precisa do tratador de exceção abaixo.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criar(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    // -------------------------------------------------------------
    // NOVO TRATADOR DE ERROS - SOLUÇÃO PARA O ERRO 500
    // -------------------------------------------------------------
    /**
     * Captura a exceção de violação de restrição do banco de dados (UNIQUE/NOT NULL)
     * e retorna o status 409 Conflict (Dados Duplicados).
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT) // Retorna o código 409 para o frontend
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        String errorMessage = "O CPF ou E-mail fornecido já está cadastrado ou inválido.";
        
        // O frontend espera um JSON com a chave "message" para exibir o alerta
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("message", errorMessage));
    }
}