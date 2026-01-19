package com.projetoPortfolio.cadastroClientes.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ClienteDto(

        @NotBlank(message = "O gênero é obrigatório.")
        String genero,

        @NotBlank(message = "O nome é obrigatório.")
        @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres.")
        String nomeCompleto,

        @NotBlank(message = "O email é obrigatório.")
        @Email(message = "Email inválido.")
        String email,

        @NotBlank(message = "O CPF é obrigatório.")
        @Pattern(regexp = "\\d{11}", message = "O CPF deve conter exatamente 11 dígitos numéricos.")
        String cpf,

        @Size(max = 250, message = "Observações no máximo 250 caracteres.")
        String observacoes

) {}

