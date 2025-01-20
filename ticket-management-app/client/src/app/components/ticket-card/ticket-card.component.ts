import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-card',
  imports: [CommonModule],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css'
})
export class TicketCardComponent implements OnInit {
  ticketService = inject(TicketService);
    tickets: Ticket[] = [];
  
    ngOnInit(): void {
      this.loadTickets();
    }
  
    loadTickets(): void {
      this.ticketService.getTickets().subscribe(
        (tickets: Ticket[]) => {
          this.tickets = tickets;
        },
        (error: any) => {
          console.error('Error loading tickets:', error);
        }
      );
    }
  
}