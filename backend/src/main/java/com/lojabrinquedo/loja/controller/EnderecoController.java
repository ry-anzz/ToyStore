package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Endereco;
import com.lojabrinquedo.loja.repository.EnderecoRepository;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {

    private final EnderecoRepository enderecoRepository;
    private final UsuarioRepository usuarioRepository;

    public EnderecoController(EnderecoRepository enderecoRepository, UsuarioRepository usuarioRepository) {
        this.enderecoRepository = enderecoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // --- MÉTODO PARA ATUALIZAR UM ENDEREÇO ---
    @PutMapping("/{id}")
    public ResponseEntity<Endereco> atualizarEndereco(@PathVariable Long id, @RequestBody Endereco dadosAtualizados) {
        return enderecoRepository.findById(id)
                .map(enderecoExistente -> {
                    enderecoExistente.setApelido(dadosAtualizados.getApelido());
                    enderecoExistente.setCep(dadosAtualizados.getCep());
                    enderecoExistente.setRua(dadosAtualizados.getRua());
                    enderecoExistente.setNumero(dadosAtualizados.getNumero());
                    enderecoExistente.setBairro(dadosAtualizados.getBairro());
                    enderecoExistente.setCidade(dadosAtualizados.getCidade());
                    enderecoExistente.setUf(dadosAtualizados.getUf());
                    
                    Endereco enderecoSalvo = enderecoRepository.save(enderecoExistente);
                    return ResponseEntity.ok(enderecoSalvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // --- MÉTODO PARA DELETAR UM ENDEREÇO ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEndereco(@PathVariable Long id) {
        if (!enderecoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        enderecoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}