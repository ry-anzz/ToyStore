package com.lojabrinquedo.loja.model;

import com.fasterxml.jackson.annotation.JsonManagedReference; // 1. MUDANÇA NA IMPORTAÇÃO
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "usuario")
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private String senha;
    private Boolean administrador = false;

    // 2. CORREÇÃO DA ANOTAÇÃO
    @JsonManagedReference
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Endereco> enderecos;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CarrinhoItens> itensCarrinho;
    
    // Getters e Setters manuais...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public Boolean getAdministrador() { return administrador; }
    public void setAdministrador(Boolean administrador) { this.administrador = administrador; }
    public List<Endereco> getEnderecos() { return enderecos; }
    public void setEnderecos(List<Endereco> enderecos) { this.enderecos = enderecos; }
    public List<CarrinhoItens> getItensCarrinho() { return itensCarrinho; }
    public void setItensCarrinho(List<CarrinhoItens> itensCarrinho) { this.itensCarrinho = itensCarrinho; }
}