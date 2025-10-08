package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
}