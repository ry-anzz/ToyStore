package com.lojabrinquedo.loja.model;
import com.fasterxml.jackson.annotation.JsonManagedReference; // IMPORTAR
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "pedido")
@NoArgsConstructor
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
    @JsonManagedReference // ADICIONAR ESTA ANOTAÇÃO
    private List<ItensPedido> itens;

    //<editor-fold defaultstate="collapsed" desc="Getters and Setters">
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public Endereco getEndereco() { return endereco; }
    public void setEndereco(Endereco endereco) { this.endereco = endereco; }
    public StatusPedido getStatusPedido() { return statusPedido; }
    public void setStatusPedido(StatusPedido statusPedido) { this.statusPedido = statusPedido; }
    public MetodoPagamento getMetodoPagamento() { return metodoPagamento; }
    public void setMetodoPagamento(MetodoPagamento metodoPagamento) { this.metodoPagamento = metodoPagamento; }
    public LocalDateTime getDataPedido() { return dataPedido; }
    public void setDataPedido(LocalDateTime dataPedido) { this.dataPedido = dataPedido; }
    public BigDecimal getValorFrete() { return valorFrete; }
    public void setValorFrete(BigDecimal valorFrete) { this.valorFrete = valorFrete; }
    public BigDecimal getValorTotal() { return valorTotal; }
    public void setValorTotal(BigDecimal valorTotal) { this.valorTotal = valorTotal; }
    public Integer getQuantidadeParcelas() { return quantidadeParcelas; }
    public void setQuantidadeParcelas(Integer quantidadeParcelas) { this.quantidadeParcelas = quantidadeParcelas; }
    public List<ItensPedido> getItens() { return itens; }
    public void setItens(List<ItensPedido> itens) { this.itens = itens; }
    //</editor-fold>
}