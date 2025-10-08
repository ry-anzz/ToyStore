package com.lojabrinquedo.loja.auth;

import lombok.Data;
import lombok.NoArgsConstructor; 

@Data
@NoArgsConstructor // Garante que o construtor vazio seja gerado
public class LoginRequest {
    private String email;
    private String senha;

    // MÉTODOS ADICIONADOS MANUALMENTE (Workaround para o erro de compilação do Lombok)
    public String getEmail() {
        return email;
    }
    
    public String getSenha() {
        return senha;
    }
}