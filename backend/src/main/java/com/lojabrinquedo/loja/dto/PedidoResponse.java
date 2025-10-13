package com.lojabrinquedo.loja.dto;

import com.lojabrinquedo.loja.model.Pedido;
import com.lojabrinquedo.loja.model.StatusPedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class PedidoResponse {
    private Long id;
    private LocalDateTime dataPedido;
    private BigDecimal valorTotal;
    private StatusPedido statusPedido;
    private List<ItemPedidoResponse> itens;
    private String nomeCliente; // NOVO CAMPO

    public PedidoResponse(Pedido pedido) {
        this.id = pedido.getId();
        this.dataPedido = pedido.getDataPedido();
        this.valorTotal = pedido.getValorTotal();
        this.statusPedido = pedido.getStatusPedido();
        this.nomeCliente = pedido.getUsuario().getNome(); // ATRIBUIR NOME DO CLIENTE
        this.itens = pedido.getItens().stream()
                .map(ItemPedidoResponse::new)
                .collect(Collectors.toList());
    }

    // Getters
    public Long getId() { return id; }
    public LocalDateTime getDataPedido() { return dataPedido; }
    public BigDecimal getValorTotal() { return valorTotal; }
    public StatusPedido getStatusPedido() { return statusPedido; }
    public List<ItemPedidoResponse> getItens() { return itens; }
    public String getNomeCliente() { return nomeCliente; } // GETTER PARA O NOVO CAMPO
}