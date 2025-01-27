import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-ticket-table',
  imports: [CommonModule],
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent implements OnInit, OnChanges {
  ticketService = inject(TicketService);
  dateService = inject(DateService);

  @Input() allTickets: Ticket[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 15;
  @Input() searchTerm: string = '';

  displayedTickets: Ticket[] = [];

  displayedColumns = ['id', 'status', 'requesterName', 'request', 'name', 'locationRegion', 'createdDate', 'lastInteraction', 'selection'];

  columnConfig: { [key: string]: { label: string; name: string } } = {
    id: { label: 'id', name: '' },
    status: { label: 'status', name: 'Status' },
    requesterName: { label: 'requesterName', name: 'Solicitante' },
    request: { label: 'request', name: 'Solicitação' },
    name: { label: 'name', name: 'Local' },
    locationRegion: { label: 'locationRegion', name: 'Região' },
    createdDate: { label: 'createdDate', name: 'Data' },
    lastInteraction: { label: 'lastInteraction', name: '' },
    selection: { label: 'selection', name: '' }
  };

  sortColumn: string | null = null;
  sortAscending: boolean = true;

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
      ticket.status?.toLowerCase().includes(lowerCaseTerm) ||
      ticket.requester?.name?.toLowerCase().includes(lowerCaseTerm) ||
      ticket.request?.toLowerCase().includes(lowerCaseTerm) ||
      ticket.location?.name?.toLowerCase().includes(lowerCaseTerm) ||
      ticket.location?.region?.toLowerCase().includes(lowerCaseTerm) ||
      (this.dateService.formatDateToDayMonthYear(ticket.createdDate) || '').toLowerCase().includes(lowerCaseTerm) ||
      this.dateService.timeSince(this.dateService.formatDateToValidISO(ticket.lastInteraction) || '').toLowerCase().includes(lowerCaseTerm)
    );
  }
  
  sortTable(column: string): void {
    if (column === 'selection') return; // Skip sorting for 'selection'

    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }

    this.displayedTickets.sort((a, b) => {
      const valueA = this.getValue(a, column);
      const valueB = this.getValue(b, column);

      if (column === 'createdDate') {
        const dateA = this.dateService.parseDate(valueA);
        const dateB = this.dateService.parseDate(valueB);
        if (dateA && dateB) {
          return this.sortAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        }
        return 0;
      }

      if (column === 'lastInteraction') {
        const dateA = this.dateService.parseISOString(this.dateService.formatDateToValidISO(a.lastInteraction));
        const dateB = this.dateService.parseISOString(this.dateService.formatDateToValidISO(b.lastInteraction));

        if (dateA && dateB) {
          return this.sortAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        }
        return 0;
      }


      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortAscending ? valueA - valueB : valueB - valueA;
      }

      if (valueA < valueB) return this.sortAscending ? -1 : 1;
      if (valueA > valueB) return this.sortAscending ? 1 : -1;
      return 0;
    });
  }

  getValue(ticket: any, column: string): any {
    switch (column) {
      case 'id':
        return ticket.id;
      case 'status':
        return ticket.status;
      case 'requesterName':
        return ticket.requester?.name;
      case 'request':
        return ticket.request;
      case 'name':
        return ticket.location?.name;
      case 'locationRegion':
        return ticket.location?.region;
      case 'createdDate':
        return this.dateService.formatDateToDayMonthYear(ticket.createdDate);
      case 'lastInteraction':
        return ticket.lastInteraction;
      default:
        return '';
    }
  }
}