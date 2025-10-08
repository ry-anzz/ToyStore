package com.lojabrinquedo.loja.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "avaliacao")
@Data @NoArgsConstructor
public class Avaliacao {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @ManyToOne @JoinColumn(name = "usuario_id", nullable = false) private Usuario usuario;
    @ManyToOne @JoinColumn(name = "produto_id", nullable = false) private Produto produto;

    @Column(nullable = false) private Integer nota; // TINYINT (1-5)

    @Column(length = 700) private String descricao;

    @Column(name = "data_avaliacao") private LocalDate dataAvaliacao;
}