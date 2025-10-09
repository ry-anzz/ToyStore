package com.lojabrinquedo.loja.model;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "metodo_pagamento")
@NoArgsConstructor
public class MetodoPagamento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(unique = true, nullable = false, length = 50) private String nome;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}