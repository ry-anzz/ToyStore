package com.lojabrinquedo.loja.model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@Entity // <-- ANOTAÇÃO QUE FALTAVA
@Table(name = "banner")
@NoArgsConstructor
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(name = "imagem_url", nullable = false, length = 512)
    private String imagemUrl;

    // Getters e Setters manuais
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
}