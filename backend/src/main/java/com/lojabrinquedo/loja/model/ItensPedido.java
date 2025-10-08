package com.lojabrinquedo.loja.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "itens_pedido")
@Data @NoArgsConstructor
public class ItensPedido {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    
    @ManyToOne @JoinColumn(name = "pedido_id", nullable = false) private Pedido pedido;
    @ManyToOne @JoinColumn(name = "produto_id", nullable = false) private Produto produto;

    @Column(nullable = false) private Integer quantidade;
    @Column(name = "preco_unitario", nullable = false, precision = 10, scale = 2) private BigDecimal precoUnitario;
}