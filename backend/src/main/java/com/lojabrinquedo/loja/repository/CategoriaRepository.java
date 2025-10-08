package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}