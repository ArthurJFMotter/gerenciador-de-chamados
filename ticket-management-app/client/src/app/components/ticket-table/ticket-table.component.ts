import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-table',
  imports: [CommonModule],
  templateUrl: './ticket-table.component.html',
  styleUrl: './ticket-table.component.css'
})
export class TicketTableComponent implements OnInit {
  ticketService = inject(TicketService);
  tickets: Ticket[] = [];

  sortColumn: number | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

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


  sortRows(columnIndex: number) {
    if (this.sortColumn === columnIndex) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnIndex;
      this.sortOrder = 'asc';
    }

    this.tickets.sort((a, b) => {
      const cellA = Object.values(a)[columnIndex] as string;
      const cellB = Object.values(b)[columnIndex] as string;

      if (columnIndex === 0) {
        const numA = parseInt(cellA, 10);
        const numB = parseInt(cellB, 10);
        return this.sortOrder === 'asc' ? numA - numB : numB - numA;
      }

      return this.sortOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });
  }
}