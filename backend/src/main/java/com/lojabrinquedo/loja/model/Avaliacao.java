package com.lojabrinquedo.loja.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "avaliacao")
@Data 
@NoArgsConstructor
public class Avaliacao { // NOME DA CLASSE CORRIGIDO
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @ManyToOne @JoinColumn(name = "usuario_id", nullable = false) private Usuario usuario;
    @ManyToOne @JoinColumn(name = "produto_id", nullable = false) private Produto produto;

    @Column(nullable = false) private Integer nota;

    @Column(length = 700) private String descricao;

    @Column(name = "data_avaliacao") private LocalDate dataAvaliacao;
    
    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean editado = false;

    // --- Getters ---
    public Long getId() { return id; }
    public Usuario getUsuario() { return usuario; }
    public Produto getProduto() { return produto; }
    public Integer getNota() { return nota; }
    public String getDescricao() { return descricao; }
    public LocalDate getDataAvaliacao() { return dataAvaliacao; }
    public boolean isEditado() { return editado; }

    // --- Setters ---
    public void setId(Long id) { this.id = id; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public void setProduto(Produto produto) { this.produto = produto; }
    public void setNota(Integer nota) { this.nota = nota; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public void setDataAvaliacao(LocalDate dataAvaliacao) { this.dataAvaliacao = dataAvaliacao; }
    public void setEditado(boolean editado) { this.editado = editado; }
}