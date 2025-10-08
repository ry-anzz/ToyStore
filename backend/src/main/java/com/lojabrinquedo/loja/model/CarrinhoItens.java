package com.lojabrinquedo.loja.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "carrinho_itens", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"usuario_id", "produto_id"})
})
@Data @NoArgsConstructor
public class CarrinhoItens {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @ManyToOne @JoinColumn(name = "usuario_id", nullable = false) private Usuario usuario;
    @ManyToOne @JoinColumn(name = "produto_id", nullable = false) private Produto produto;

    @Column(nullable = false) private Integer quantidade;
}