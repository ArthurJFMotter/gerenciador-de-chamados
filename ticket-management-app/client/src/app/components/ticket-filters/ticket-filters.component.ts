import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-ticket-filters',
  imports: [CommonModule],
  templateUrl: './ticket-filters.component.html',
  styleUrl: './ticket-filters.component.css'
})
export class TicketFiltersComponent {
  ticketService = inject(TicketService);
  dateService = inject(DateService);

  @Input() allTickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];

  filterId: string = '';
  filterStatus: string = '';
  filterRequester: string = '';
  filterRequest: string = '';
  filterLocation: string = '';
  filterRegion: string = '';
  filterStartDate: string = '';
  filterLastInteraction: string = '';

  ngOnInit(): void {
    this.filteredTickets = [...this.allTickets];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTickets']) {
      this.filteredTickets = [...this.allTickets];
      this.applyFilters();
    }
  }

  applyFilters(): void {
    this.filteredTickets = this.allTickets.filter(ticket => {
      const idMatch = !this.filterId || String(ticket.id).includes(this.filterId);
      const statusMatch = !this.filterStatus || ticket.status?.toLowerCase().includes(this.filterStatus.toLowerCase());
      const requesterMatch = !this.filterRequester || ticket.requester?.name?.toLowerCase().includes(this.filterRequester.toLowerCase());
      const requestMatch = !this.filterRequest || ticket.request?.toLowerCase().includes(this.filterRequest.toLowerCase());
      const locationMatch = !this.filterLocation || ticket.location?.locationName?.toLowerCase().includes(this.filterLocation.toLowerCase());
      const regionMatch = !this.filterRegion || ticket.location?.region?.toLowerCase().includes(this.filterRegion.toLowerCase());
      const startDateMatch = !this.filterStartDate || this.dateService.formatDateToDayMonthYear(ticket.startDate)?.includes(this.filterStartDate);

      return idMatch && statusMatch && requesterMatch && requestMatch && locationMatch && regionMatch && startDateMatch;
    });
  }
}
