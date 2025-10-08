package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; // Certifique-se de que Optional está importado

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // ESTA LINHA É CRUCIAL para o Login funcionar
    Optional<Usuario> findByEmail(String email); 
}