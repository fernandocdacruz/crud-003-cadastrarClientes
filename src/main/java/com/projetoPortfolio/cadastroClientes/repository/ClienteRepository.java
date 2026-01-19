package com.projetoPortfolio.cadastroClientes.repository;

import com.projetoPortfolio.cadastroClientes.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
}
