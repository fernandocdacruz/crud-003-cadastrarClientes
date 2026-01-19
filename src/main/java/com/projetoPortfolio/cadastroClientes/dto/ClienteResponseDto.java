package com.projetoPortfolio.cadastroClientes.dto;

public record ClienteResponseDto(
        Long id,
        String nomeCompleto,
        String email,
        String cpf,
        String genero,
        String observacoes
) {}
