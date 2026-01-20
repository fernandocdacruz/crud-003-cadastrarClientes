import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.service.listar().subscribe(res => this.clientes = res);
  }

  novo(): void {
    this.router.navigate(['/clientes/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.service.excluir(id).subscribe(() => this.carregar());
    }
  }
}

