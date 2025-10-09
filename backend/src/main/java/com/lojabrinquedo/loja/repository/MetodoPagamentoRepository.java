package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.MetodoPagamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetodoPagamentoRepository extends JpaRepository<MetodoPagamento, Long> {
}