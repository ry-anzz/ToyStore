package com.lojabrinquedo.loja.dto;

import com.lojabrinquedo.loja.model.Avaliacao;
import java.time.LocalDate;

public class AvaliacaoResponse {
    private Long id;
    private String autor;
    private Integer nota;
    private String descricao;
    private LocalDate data;

    // Construtor que converte a entidade Avaliacao para este DTO
    public AvaliacaoResponse(Avaliacao avaliacao) {
        this.id = avaliacao.getId();
        this.autor = avaliacao.getUsuario().getNome(); // Pega apenas o nome do usuário
        this.nota = avaliacao.getNota();
        this.descricao = avaliacao.getDescricao();
        this.data = avaliacao.getDataAvaliacao();
    }

    // Getters
    public Long getId() { return id; }
    public String getAutor() { return autor; }
    public Integer getNota() { return nota; }
    public String getDescricao() { return descricao; }
    public LocalDate getData() { return data; }
}