package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}