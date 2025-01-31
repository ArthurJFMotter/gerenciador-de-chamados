import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {  MatTooltipModule } from '@angular/material/tooltip';


@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatTooltipModule],
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
    sortDirection: string = 'asc';
    selectedTickets = new Set<Ticket>();

    ngOnInit(): void {
        this.updateDisplayedTickets();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['allTickets'] || changes['currentPage'] || changes['pageSize'] || changes['searchTerm']) {
            this.updateDisplayedTickets();
            this.sortTickets();
            this.selectedTickets.clear();
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
                let comparison = 0;
                if (this.sortOption === 'createdDate' || this.sortOption === 'lastInteraction') {
                    const dateA = this.dateService.parseDate((a as any)[this.sortOption])?.getTime() || 0;
                    const dateB = this.dateService.parseDate((b as any)[this.sortOption])?.getTime() || 0;
                    comparison = dateA - dateB;
                }
                 else {
                    const valueA = (a as any)[this.sortOption] || '';
                    const valueB = (b as any)[this.sortOption] || '';
                     comparison = String(valueA).localeCompare(String(valueB));
                }
               return this.sortDirection === 'asc' ? comparison : -comparison
            });
        }
    }

    toggleCard(ticket: Ticket): void {
        if (this.selectedTickets.has(ticket)) {
            this.selectedTickets.delete(ticket);
        } else {
            this.selectedTickets.add(ticket);
        }
    }

    toggleAllCards(): void {
        if (this.isAllSelected()) {
            this.selectedTickets.clear();
        } else {
            this.displayedTickets.forEach(ticket => this.selectedTickets.add(ticket));
        }
    }

    isSelected(ticket: Ticket): boolean {
        return this.selectedTickets.has(ticket);
    }

    isAllSelected(): boolean {
        return this.selectedTickets.size === this.displayedTickets.length;
    }

    isSomeSelected(): boolean {
        return this.selectedTickets.size > 0 && this.selectedTickets.size < this.displayedTickets.length
    }

   setSortDirection(direction: string): void {
    this.sortDirection = direction;
    this.sortTickets();
}

    checkboxLabel(ticket?: Ticket): string {
        if (!ticket) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.isSelected(ticket) ? 'deselect' : 'select'} card ${ticket.id}`;
    }
}