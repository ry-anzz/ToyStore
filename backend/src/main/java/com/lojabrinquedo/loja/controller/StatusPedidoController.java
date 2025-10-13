package com.lojabrinquedo.loja.controller;

import com.lojabrinquedo.loja.model.StatusPedido;
import com.lojabrinquedo.loja.repository.StatusPedidoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/status-pedido")
public class StatusPedidoController {

    private final StatusPedidoRepository repository;

    public StatusPedidoController(StatusPedidoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<StatusPedido> listarTodos() {
        return repository.findAll();
    }
}