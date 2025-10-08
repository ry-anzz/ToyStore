// src/main/java/com/lojabrinquedo/loja/controller/UsuarioController.java
package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Endereco;
import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map; // 1. IMPORT NECESSÁRIO

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

        if (usuario.getEnderecos() != null && !usuario.getEnderecos().isEmpty()) {
            for (Endereco endereco : usuario.getEnderecos()) {
                endereco.setUsuario(usuario);
                endereco.setNomeDestinatario(usuario.getNome());
            }
        }

        Usuario novoUsuario = usuarioRepository.save(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    // --- MÉTODO DE ATUALIZAÇÃO CORRIGIDO ---
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Map<String, String> dadosAtualizados) {
        return usuarioRepository.findById(id)
                .map(usuarioExistente -> {
                    // Atualiza os campos pegando os valores do Map
                    usuarioExistente.setNome(dadosAtualizados.get("nome"));
                    usuarioExistente.setEmail(dadosAtualizados.get("email"));
                    
                    // Concatena DDD e Telefone recebidos do Map
                    String ddd = dadosAtualizados.get("ddd");
                    String telefone = dadosAtualizados.get("telefone");
                    String telefoneCompleto = (ddd != null ? ddd : "") + (telefone != null ? telefone : "");
                    
                    // Salva o número completo e limpo no campo 'telefone'
                    usuarioExistente.setTelefone(telefoneCompleto.replaceAll("\\D", ""));

                    Usuario usuarioSalvo = usuarioRepository.save(usuarioExistente);
                    return ResponseEntity.ok(usuarioSalvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}