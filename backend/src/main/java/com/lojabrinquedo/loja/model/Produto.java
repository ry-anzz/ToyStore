package com.lojabrinquedo.loja.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "produto")
@Data
@NoArgsConstructor
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    // O campo imagemUrl foi removido daqui

    @Column(name = "quantidade_estoque", columnDefinition = "INT DEFAULT 0")
    private Integer quantidadeEstoque;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private Marca marca;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
    
    @OneToMany(
        mappedBy = "produto",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.EAGER // EAGER para sempre carregar as imagens junto com o produto
    )
    @JsonManagedReference
    private List<ProdutoImagem> imagens = new ArrayList<>();

    // --- Getters e Setters Manuais ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public Integer getQuantidadeEstoque() { return quantidadeEstoque; }
    public void setQuantidadeEstoque(Integer quantidadeEstoque) { this.quantidadeEstoque = quantidadeEstoque; }

    public Marca getMarca() { return marca; }
    public void setMarca(Marca marca) { this.marca = marca; }
    
    public Categoria getCategoria() { return categoria; }
    public void setCategoria(Categoria categoria) { this.categoria = categoria; }

    public List<ProdutoImagem> getImagens() { return imagens; }
    public void setImagens(List<ProdutoImagem> imagens) { this.imagens = imagens; }
}