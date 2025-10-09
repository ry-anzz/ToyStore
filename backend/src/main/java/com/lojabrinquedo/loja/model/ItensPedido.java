package com.lojabrinquedo.loja.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "itens_pedido")
@Data 
@NoArgsConstructor
public class ItensPedido {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    
    @ManyToOne @JoinColumn(name = "pedido_id", nullable = false) private Pedido pedido;
    @ManyToOne @JoinColumn(name = "produto_id", nullable = false) private Produto produto;

    @Column(nullable = false) private Integer quantidade;
    @Column(name = "preco_unitario", nullable = false, precision = 10, scale = 2) private BigDecimal precoUnitario;

    // --- GETTERS E SETTERS ADICIONADOS MANUALMENTE ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }

    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public BigDecimal getPrecoUnitario() { return precoUnitario; }
    public void setPrecoUnitario(BigDecimal precoUnitario) { this.precoUnitario = precoUnitario; }
}