import { Routes } from '@angular/router';
import { PanelComponent } from './pages/panel/panel.component';
import { TicketComponent } from './pages/ticket/ticket.component';
import { CreateQueueComponent } from './pages/create-queue/create-queue.component';

export const routes: Routes = [
    { path: 'panel', component: PanelComponent },
    { path: 'ticket/:id', component: TicketComponent }, // Route for individual ticket details
    { path: 'createQueue', component: CreateQueueComponent },
    { path: '', redirectTo: '/panel', pathMatch: 'full' }, // Default
    { path: '**', redirectTo: '/panel' } // Handle unknown routes
  ];