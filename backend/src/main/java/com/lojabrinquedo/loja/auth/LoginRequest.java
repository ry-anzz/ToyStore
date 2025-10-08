package com.lojabrinquedo.loja.auth;

import lombok.Data;
import lombok.NoArgsConstructor; // Adicione esta linha (se não estiver lá)

@Data
@NoArgsConstructor // Adicione esta linha (para garantir construtor vazio)
public class LoginRequest {
    private String email;
    private String senha;

    // MÉTODOS ADICIONADOS MANUALMENTE PARA CORRIGIR O ERRO DE COMPILAÇÃO:
    public String getEmail() {
        return email;
    }
    
    public String getSenha() {
        return senha;
    }
}