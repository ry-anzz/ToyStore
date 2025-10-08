package com.lojabrinquedo.loja.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolation(DataIntegrityViolationException ex, WebRequest request) {
        String errorMessage = "Erro de dados: um valor que você informou (como CPF ou E-mail) já existe no sistema.";

        // Tenta extrair a causa mais específica do erro (funciona bem com MySQL)
        Throwable mostSpecificCause = ex.getMostSpecificCause();
        if (mostSpecificCause != null && mostSpecificCause.getMessage().contains("Duplicate entry")) {
            try {
                // Extrai o valor duplicado da mensagem de erro do MySQL
                String[] parts = mostSpecificCause.getMessage().split("'");
                if (parts.length >= 2) {
                    errorMessage = "O valor '" + parts[1] + "' já está cadastrado no sistema.";
                }
            } catch (Exception e) {
                // Se a extração falhar, usa a mensagem padrão.
            }
        }
        
        Map<String, Object> body = new HashMap<>();
        body.put("message", errorMessage);

        return new ResponseEntity<>(body, HttpStatus.CONFLICT);
    }
}