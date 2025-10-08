package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByEmail(String email);
    
    // ADICIONE ESTA LINHA ABAIXO
    boolean existsByEmailOrCpf(String email, String cpf); 
}