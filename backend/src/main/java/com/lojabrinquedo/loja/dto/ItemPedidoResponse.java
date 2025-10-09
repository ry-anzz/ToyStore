package com.lojabrinquedo.loja.dto;

import com.lojabrinquedo.loja.model.ItensPedido;
import com.lojabrinquedo.loja.model.ProdutoImagem;
import java.math.BigDecimal;
import java.util.List;

public class ItemPedidoResponse {
    private Long id;
    private int quantidade;
    private BigDecimal precoUnitario;
    private ProdutoResponse produto;

    public ItemPedidoResponse(ItensPedido item) {
        this.id = item.getId();
        this.quantidade = item.getQuantidade();
        this.precoUnitario = item.getPrecoUnitario();
        this.produto = new ProdutoResponse(item.getProduto());
    }

    // Getters
    public Long getId() { return id; }
    public int getQuantidade() { return quantidade; }
    public BigDecimal getPrecoUnitario() { return precoUnitario; }
    public ProdutoResponse getProduto() { return produto; }

    // DTO aninhado para o produto, contendo apenas o necessário
    // ALTERAÇÃO DE "private" PARA "public"
    public static class ProdutoResponse {
        private Long id;
        private String nome;
        private List<ProdutoImagem> imagens;

        public ProdutoResponse(com.lojabrinquedo.loja.model.Produto produto) {
            this.id = produto.getId();
            this.nome = produto.getNome();
            this.imagens = produto.getImagens();
        }

        // Getters
        public Long getId() { return id; }
        public String getNome() { return nome; }
        public List<ProdutoImagem> getImagens() { return imagens; }
    }
}