package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    // Método para encontrar todas as avaliações de um produto específico
    List<Avaliacao> findByProdutoId(Long produtoId);
}