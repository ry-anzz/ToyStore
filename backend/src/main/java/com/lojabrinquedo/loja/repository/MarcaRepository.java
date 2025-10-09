package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

// A interface deve estender JpaRepository<Marca, Long>
public interface MarcaRepository extends JpaRepository<Marca, Long> {
}