package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    
    // MÉTODO ATUALIZADO: Procura por um endereço com o mesmo CEP e Número para o mesmo usuário.
    Optional<Endereco> findByUsuarioIdAndCepAndNumero(Long usuarioId, String cep, String numero);
}