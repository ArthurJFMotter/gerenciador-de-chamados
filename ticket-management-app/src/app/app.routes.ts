import { Routes } from '@angular/router';
import { PanelComponent } from './pages/panel/panel.component';
import { TicketComponent } from './pages/ticket/ticket.component';

export const routes: Routes = [
    { path: 'panel', component: PanelComponent },
    { path: 'ticket', component: TicketComponent },
    { path: '', redirectTo: '/panel', pathMatch: 'full' }, // Default
    { path: '**', redirectTo: '/panel' } // Handle unknown routes
  ];