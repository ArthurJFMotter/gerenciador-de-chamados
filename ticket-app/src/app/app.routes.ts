import { Routes } from '@angular/router';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';
import { ConsultTicketComponent } from './pages/consult-ticket/consult-ticket.component';

export const routes: Routes = [
  { path: 'create', component: CreateTicketComponent },
  { path: 'consult', component: ConsultTicketComponent },
  { path: '', redirectTo: '/consult', pathMatch: 'full' }, // Rota padrão
];
