import { Routes } from '@angular/router';
import { ClienteListComponent } from './pages/cliente-list/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form/cliente-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/novo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent }
];


