package com.projetoPortfolio.cadastroClientes.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ClienteUpdateDto(

        @NotBlank(message = "O nome é obrigatório.")
        @Size(min = 3, max = 100)
        String nomeCompleto,

        @NotBlank(message = "O email é obrigatório.")
        @Email
        String email,

        @NotBlank(message = "O CPF é obrigatório.")
        @Pattern(regexp = "\\d{11}")
        String cpf,

        @NotBlank(message = "O gênero é obrigatório.")
        String genero,

        @Size(max = 250)
        String observacoes

) {}

