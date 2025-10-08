package com.lojabrinquedo.loja.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedido")
@Data @NoArgsConstructor
public class Pedido {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @ManyToOne @JoinColumn(name = "usuario_id", nullable = false) private Usuario usuario;
    @ManyToOne @JoinColumn(name = "endereco_id", nullable = false) private Endereco endereco;
    @ManyToOne @JoinColumn(name = "status_pedido_id", nullable = false) private StatusPedido statusPedido;
    @ManyToOne @JoinColumn(name = "metodo_pagamento_id", nullable = false) private MetodoPagamento metodoPagamento;

    @Column(name = "data_pedido", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dataPedido = LocalDateTime.now();

    @Column(name = "valor_frete", precision = 10, scale = 2) private BigDecimal valorFrete;
    @Column(name = "valor_total", nullable = false, precision = 10, scale = 2) private BigDecimal valorTotal;
    @Column(name = "quantidade_parcelas", columnDefinition = "INT DEFAULT 1") private Integer quantidadeParcelas = 1;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ItensPedido> itens;
}