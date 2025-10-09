package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.Endereco;
import com.lojabrinquedo.loja.model.Usuario;
import com.lojabrinquedo.loja.repository.EnderecoRepository;
import com.lojabrinquedo.loja.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {

    private final EnderecoRepository enderecoRepository;
    private final UsuarioRepository usuarioRepository;

    public EnderecoController(EnderecoRepository enderecoRepository, UsuarioRepository usuarioRepository) {
        this.enderecoRepository = enderecoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    
    @PostMapping
    public ResponseEntity<Endereco> criarEndereco(@RequestBody Map<String, Object> payload) {
        Long usuarioId = Long.parseLong(payload.get("usuarioId").toString());
        String cep = ((String) payload.get("cep")).replaceAll("\\D", ""); // Limpa o CEP
        String numero = (String) payload.get("numero");
        
        // --- LÓGICA DE VERIFICAÇÃO DE DUPLICIDADE ATUALIZADA ---
        Optional<Endereco> enderecoExistente = enderecoRepository.findByUsuarioIdAndCepAndNumero(usuarioId, cep, numero);
        
        if (enderecoExistente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Um endereço com este CEP e número já está cadastrado.");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        Endereco novoEndereco = new Endereco();
        novoEndereco.setUsuario(usuario);
        novoEndereco.setApelido((String) payload.get("apelido"));
        novoEndereco.setCep(cep);
        novoEndereco.setRua((String) payload.get("rua"));
        novoEndereco.setNumero(numero);
        novoEndereco.setBairro((String) payload.get("bairro"));
        novoEndereco.setCidade((String) payload.get("cidade"));
        novoEndereco.setUf((String) payload.get("uf"));
        novoEndereco.setNomeDestinatario(usuario.getNome());

        Endereco enderecoSalvo = enderecoRepository.save(novoEndereco);
        return new ResponseEntity<>(enderecoSalvo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Endereco> atualizarEndereco(@PathVariable Long id, @RequestBody Map<String, String> dadosAtualizados) {
        return enderecoRepository.findById(id)
                .map(enderecoExistente -> {
                    enderecoExistente.setApelido(dadosAtualizados.get("apelido"));
                    enderecoExistente.setCep(dadosAtualizados.get("cep").replaceAll("\\D", ""));
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

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletarEndereco(@PathVariable Long id) {
        Optional<Endereco> enderecoOpt = enderecoRepository.findById(id);
        if (enderecoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Endereco endereco = enderecoOpt.get();
        Usuario usuario = endereco.getUsuario();
        if (usuario != null) {
            usuario.getEnderecos().remove(endereco);
        }
        enderecoRepository.delete(endereco);

        return ResponseEntity.noContent().build();
    }
}