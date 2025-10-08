package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Endereco;
import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.EnderecoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional; // 1. IMPORTAR OPTIONAL

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {

    private final EnderecoRepository enderecoRepository;

    public EnderecoController(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Endereco> atualizarEndereco(@PathVariable Long id, @RequestBody Map<String, String> dadosAtualizados) {
        return enderecoRepository.findById(id)
                .map(enderecoExistente -> {
                    enderecoExistente.setApelido(dadosAtualizados.get("apelido"));
                    enderecoExistente.setCep(dadosAtualizados.get("cep"));
                    enderecoExistente.setRua(dadosAtualizados.get("rua"));
                    enderecoExistente.setNumero(dadosAtualizados.get("numero"));
                    enderecoExistente.setBairro(dadosAtualizados.get("bairro"));
                    enderecoExistente.setCidade(dadosAtualizados.get("cidade"));
                    enderecoExistente.setUf(dadosAtualizados.get("uf"));
                    
                    Endereco enderecoSalvo = enderecoRepository.save(enderecoExistente);
                    return ResponseEntity.ok(enderecoSalvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // --- MÉTODO DE EXCLUSÃO CORRIGIDO ---
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletarEndereco(@PathVariable Long id) {
        // 2. Buscamos o endereço primeiro
        Optional<Endereco> enderecoOpt = enderecoRepository.findById(id);

        // 3. Verificamos se ele existe
        if (enderecoOpt.isEmpty()) {
            return ResponseEntity.notFound().build(); // Se não existir, retorna 404 Not Found
        }

        // 4. Se existir, continuamos com a lógica de exclusão
        Endereco endereco = enderecoOpt.get();
        Usuario usuario = endereco.getUsuario();
        if (usuario != null) {
            usuario.getEnderecos().remove(endereco);
        }
        enderecoRepository.delete(endereco);

        return ResponseEntity.noContent().build(); // Retorna 204 No Content (sucesso)
    }
}