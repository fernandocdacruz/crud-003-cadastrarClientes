package com.projetoPortfolio.cadastroClientes.controller;

import com.projetoPortfolio.cadastroClientes.dto.ClienteDto;
import com.projetoPortfolio.cadastroClientes.dto.ClienteResponseDto;
import com.projetoPortfolio.cadastroClientes.dto.ClienteUpdateDto;
import com.projetoPortfolio.cadastroClientes.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/satolep-produtos")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<ClienteResponseDto> cadastrarNovoCliente(
            @Valid @RequestBody ClienteDto clienteDto) {

        ClienteResponseDto response = clienteService.cadastrarNovoCliente(clienteDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public List<ClienteResponseDto> listar() {
        return clienteService.listarTodosClientes();
    }

    @GetMapping("/{id}")
    public  ResponseEntity<ClienteResponseDto> buscarClientePorId(@PathVariable Long id) {
        ClienteResponseDto response = clienteService.buscarClientePorId(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDto> atualizarCliente(@PathVariable Long id, @Valid @RequestBody ClienteUpdateDto dto) {
        ClienteResponseDto response = clienteService.atualizarCliente(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        clienteService.excluirCliente(id);
        return ResponseEntity.noContent().build();
    }

}

