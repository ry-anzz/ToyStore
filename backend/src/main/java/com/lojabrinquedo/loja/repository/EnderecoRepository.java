package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

// A interface deve estender JpaRepository<Endereco, Long>
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
}