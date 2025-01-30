import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatCheckboxModule],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit {
  ticketService = inject(TicketService);
  dateService = inject(DateService);

  @Input() allTickets: Ticket[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 15;
  @Input() searchTerm: string = '';

  displayedTickets: Ticket[] = [];

  ngOnInit(): void {
    this.updateDisplayedTickets();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTickets'] || changes['currentPage'] || changes['pageSize'] || changes['searchTerm']) {
      this.updateDisplayedTickets();
    }
  }

  updateDisplayedTickets(): void {
    const filteredTickets = this.filterTickets(this.allTickets, this.searchTerm);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedTickets = filteredTickets.slice(startIndex, endIndex);
  }

  filterTickets(tickets: Ticket[], term: string): Ticket[] {
      if (!term) return tickets;

      const lowerCaseTerm = term.toLowerCase();
      return tickets.filter(ticket =>
          ticket.id.toString().includes(lowerCaseTerm) ||
          ticket.responsible?.toLowerCase().includes(lowerCaseTerm) ||
          ticket.requester.name.toLowerCase().includes(lowerCaseTerm) ||
          ticket.request.toLowerCase().includes(lowerCaseTerm) ||
          ticket.location.name.toLowerCase().includes(lowerCaseTerm) ||
          ticket.location.region.toLowerCase().includes(lowerCaseTerm) ||
          ticket.createdDate.toLowerCase().includes(lowerCaseTerm)
      );
  }
}