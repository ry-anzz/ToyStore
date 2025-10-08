package com.lojabrinquedo.loja.model;

import com.fasterxml.jackson.annotation.JsonBackReference; 
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "endereco")
@Data
@NoArgsConstructor
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false, length = 100)
    private String rua;

    @Column(nullable = false, length = 10)
    private String numero;

    @Column(nullable = false, length = 100)
    private String bairro;

    @Column(nullable = false, length = 100)
    private String cidade;

    @Column(nullable = false, length = 2)
    private String uf;

    @Column(nullable = false, length = 9)
    private String cep;

    @Column(name = "nome_destinatario", length = 100)
    private String nomeDestinatario;
    
    // Adicionando um campo 'apelido' que faz sentido com o seu frontend (AddressForm.tsx)
    private String apelido;
}