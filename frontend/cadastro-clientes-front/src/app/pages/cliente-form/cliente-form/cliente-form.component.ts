import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  form!: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [
        Validators.required,
        Validators.pattern(/^\d{11}$/)
      ]],
      genero: ['', Validators.required],
      observacoes: ['']
    });

    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = paramId ? Number(paramId) : undefined;

    if (this.id) {
      this.service.buscarPorId(this.id).subscribe(cliente => {
        this.form.patchValue(cliente);
      });
    }
  }

  somenteNumeros(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 11);
    this.form.get('cpf')?.setValue(input.value);
  }

  salvar(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      genero: this.form.value.genero.toLowerCase()
    };

    if (this.id) {
      this.service.atualizar(this.id, payload)
        .subscribe(() => this.router.navigate(['/clientes']));
    } else {
      this.service.criar(payload)
        .subscribe(() => this.router.navigate(['/clientes']));
    }
  }
}





