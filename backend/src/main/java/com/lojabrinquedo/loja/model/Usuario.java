package com.lojabrinquedo.loja.model;

import com.fasterxml.jackson.annotation.JsonBackReference; 
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(unique = true, nullable = false, length = 14)
    private String cpf;

    @Column(length = 20)
    private String telefone;

    @Column(nullable = false, length = 255)
    private String senha;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean administrador = false;

    // Relacionamento com Endereços
    @JsonBackReference
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Endereco> enderecos;
    
    // Relacionamento com Carrinho
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CarrinhoItens> itensCarrinho;
    
    // MÉTODOS ADICIONADOS MANUALMENTE PARA CORRIGIR O ERRO DE COMPILAÇÃO:
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}