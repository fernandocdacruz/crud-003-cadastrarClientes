package com.projetoPortfolio.cadastroClientes.mapper;

import com.projetoPortfolio.cadastroClientes.dto.ClienteDto;
import com.projetoPortfolio.cadastroClientes.dto.ClienteResponseDto;
import com.projetoPortfolio.cadastroClientes.dto.ClienteUpdateDto;
import com.projetoPortfolio.cadastroClientes.model.Cliente;

public class ClienteMapper {

    public static Cliente toEntity(ClienteDto dto) {
        Cliente cliente = new Cliente();
        cliente.setGenero(dto.genero());
        cliente.setNomeCompleto(dto.nomeCompleto());
        cliente.setEmail(dto.email());
        cliente.setCpf(dto.cpf());
        cliente.setObservacoes(dto.observacoes());
        return cliente;
    }

    public static ClienteResponseDto toResponseDto(Cliente cliente) {
        return new ClienteResponseDto(
                cliente.getId(),
                cliente.getNomeCompleto(),
                cliente.getEmail(),
                cliente.getCpf(),
                cliente.getGenero(),
                cliente.getObservacoes()
        );
    }

    public static void updateEntityFromDto(ClienteUpdateDto dto, Cliente cliente) {
        cliente.setNomeCompleto(dto.nomeCompleto());
        cliente.setEmail(dto.email());
        cliente.setCpf(dto.cpf());
        cliente.setGenero(dto.genero());
        cliente.setObservacoes(dto.observacoes());
    }

}

