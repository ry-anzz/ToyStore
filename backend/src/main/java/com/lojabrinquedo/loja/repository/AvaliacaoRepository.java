package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    
    List<Avaliacao> findByProdutoId(Long produtoId);

    // NOVO MÉTODO: Verifica se a combinação de usuário e produto já existe
    boolean existsByUsuarioIdAndProdutoId(Long usuarioId, Long produtoId);
}