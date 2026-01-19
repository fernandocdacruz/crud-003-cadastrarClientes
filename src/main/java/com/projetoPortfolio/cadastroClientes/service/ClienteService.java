package com.projetoPortfolio.cadastroClientes.service;

import com.projetoPortfolio.cadastroClientes.dto.ClienteDto;
import com.projetoPortfolio.cadastroClientes.dto.ClienteResponseDto;
import com.projetoPortfolio.cadastroClientes.dto.ClienteUpdateDto;
import com.projetoPortfolio.cadastroClientes.exception.RegraNegocioException;
import com.projetoPortfolio.cadastroClientes.mapper.ClienteMapper;
import com.projetoPortfolio.cadastroClientes.model.Cliente;
import com.projetoPortfolio.cadastroClientes.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

//parei no service

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public ClienteResponseDto cadastrarNovoCliente(ClienteDto dto) {

        if (clienteRepository.existsByEmail(dto.email())) {
            throw new RegraNegocioException("Email já cadastrado.");
        }

        if (clienteRepository.existsByCpf(dto.cpf())) {
            throw new RegraNegocioException("CPF já cadastrado.");
        }

        Cliente cliente = ClienteMapper.toEntity(dto);
        Cliente salvo = clienteRepository.save(cliente);

        return ClienteMapper.toResponseDto(salvo);
    }

    public List<ClienteResponseDto> listarTodosClientes() {
        return clienteRepository.findAll().stream()
                .map(ClienteMapper::toResponseDto)
                .toList();
    }

    public ClienteResponseDto buscarClientePorId(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Cliente não encontrado"));
        return ClienteMapper.toResponseDto(cliente);
    }

    public ClienteResponseDto atualizarCliente(Long id, ClienteUpdateDto dto) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Cliente não encontrado"));

        ClienteMapper.updateEntityFromDto(dto, cliente);
        Cliente salvo = clienteRepository.save(cliente);
        return ClienteMapper.toResponseDto(salvo);
    }

    public void excluirCliente(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new RegraNegocioException("Cliente não encontrado para exclusão.");
        }

        clienteRepository.deleteById(id);
    }


}

