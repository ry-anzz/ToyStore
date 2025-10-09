package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.StatusPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StatusPedidoRepository extends JpaRepository<StatusPedido, Long> {
    Optional<StatusPedido> findByNome(String nome);
}