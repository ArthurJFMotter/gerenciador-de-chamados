import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule],
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
    sortOption: string = 'id';

    ngOnInit(): void {
        this.updateDisplayedTickets();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['allTickets'] || changes['currentPage'] || changes['pageSize'] || changes['searchTerm']) {
            this.updateDisplayedTickets();
            this.sortTickets();
        }
    }

    updateDisplayedTickets(): void {
        const filteredTickets = this.filterTickets(this.allTickets, this.searchTerm);

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        this.displayedTickets = filteredTickets.slice(startIndex, endIndex).map(ticket => ({
            ...ticket,
            lastInteraction: this.dateService.timeSince(ticket.lastInteraction),
        }));
        this.sortTickets();
    }

    filterTickets(tickets: Ticket[], term: string): Ticket[] {
        if (!term) return tickets;

        const lowerCaseTerm = term.toLowerCase();

        return tickets.filter(ticket =>
            ticket.id.toString().includes(lowerCaseTerm) ||
            ticket.responsible?.toLowerCase().includes(lowerCaseTerm) ||
            ticket.requesterName.toLowerCase().includes(lowerCaseTerm) ||
            ticket.request?.toLowerCase().includes(lowerCaseTerm) ||
            ticket.locationName.toLowerCase().includes(lowerCaseTerm) ||
            ticket.locationRegion.toLowerCase().includes(lowerCaseTerm)
        );
    }

  sortTickets(): void {
    if (this.sortOption) {
      this.displayedTickets.sort((a, b) => {
          if (this.sortOption === 'createdDate') {
              const dateA = this.dateService.parseDate(a.createdDate)?.getTime() || 0;
              const dateB = this.dateService.parseDate(b.createdDate)?.getTime() || 0;
              return dateA - dateB;
          }
        const valueA = (a as any)[this.sortOption] || '';
        const valueB = (b as any)[this.sortOption] || '';
        return String(valueA).localeCompare(String(valueB));
      });
    }
  }

}