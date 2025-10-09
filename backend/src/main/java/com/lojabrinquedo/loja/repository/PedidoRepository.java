package com.lojabrinquedo.loja.repository;

import com.lojabrinquedo.loja.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    // Busca todos os pedidos de um usuário específico, ordenados do mais novo para o mais antigo
    List<Pedido> findByUsuarioIdOrderByDataPedidoDesc(Long usuarioId);
    
    // NOVO MÉTODO: Busca todos os pedidos, ordenados do mais novo para o mais antigo
    List<Pedido> findAllByOrderByDataPedidoDesc();
}