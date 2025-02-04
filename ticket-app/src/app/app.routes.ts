import { Routes } from '@angular/router';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';

export const routes: Routes = [
    { path: 'criar', component: CreateTicketComponent },
    //{ path: 'consultar', component: ConsultarChamadoComponent },
    { path: '', redirectTo: '/criar', pathMatch: 'full' }, // Rota padrão
  ];
