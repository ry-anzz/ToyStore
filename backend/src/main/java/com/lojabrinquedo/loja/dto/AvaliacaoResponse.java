package com.lojabrinquedo.loja.dto;

import com.lojabrinquedo.loja.model.Avaliacao;
import java.time.LocalDate;

public class AvaliacaoResponse {
    private Long id;
    private Long autorId; // NOVO CAMPO
    private String autor;
    private Integer nota;
    private String descricao;
    private LocalDate data;
    private boolean editado; // NOVO CAMPO

    public AvaliacaoResponse(Avaliacao avaliacao) {
        this.id = avaliacao.getId();
        this.autorId = avaliacao.getUsuario().getId(); // Pega o ID do autor
        this.autor = avaliacao.getUsuario().getNome();
        this.nota = avaliacao.getNota();
        this.descricao = avaliacao.getDescricao();
        this.data = avaliacao.getDataAvaliacao();
        this.editado = avaliacao.isEditado(); // Pega o status de edição
    }

    // Getters
    public Long getId() { return id; }
    public Long getAutorId() { return autorId; }
    public String getAutor() { return autor; }
    public Integer getNota() { return nota; }
    public String getDescricao() { return descricao; }
    public LocalDate getData() { return data; }
    public boolean isEditado() { return editado; }
}