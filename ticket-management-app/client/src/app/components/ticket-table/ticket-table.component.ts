import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';

interface ColumnConfig {
  label: string;
  name: string;
}

@Component({
  selector: 'app-ticket-table',
  imports: [CommonModule],
  templateUrl: './ticket-table.component.html',
  styleUrl: './ticket-table.component.css'
})
export class TicketTableComponent implements OnInit, OnChanges {
  ticketService = inject(TicketService);

  @Input() allTickets: Ticket[] = [];
  displayedTickets: Ticket[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 15;

  ngOnInit(): void {
    this.updateDisplayedTickets();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTickets'] || changes['currentPage'] || changes['pageSize']) {
      this.updateDisplayedTickets();
    }
  }

  updateDisplayedTickets(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedTickets = this.allTickets.slice(startIndex, endIndex);
  }

  displayedColumns = ['id', 'status', 'requesterName', 'request', 'locationName', 'locationRegion', 'startDate', 'lastInteraction', 'selection'];

  columnConfig: { [key: string]: { label: string; name: string } } = {
    id: { label: 'id', name: '' },
    status: { label: 'status', name: 'Status' },
    requesterName: { label: 'requesterName', name: 'Requester Name' },
    request: { label: 'request', name: 'Request' },
    locationName: { label: 'locationName', name: 'Location Name' },
    locationRegion: { label: 'locationRegion', name: 'Location Region' },
    startDate: { label: 'startDate', name: 'Start Date' },
    lastInteraction: { label: 'lastInteraction', name: '' },
    selection: { label: 'selection', name: '' }
  };

  sortColumn: string | null = null;
  sortAscending: boolean = true;

  sortTable(column: string): void {
    if (column === 'selection') return; // Skip sorting for 'selection'

    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending; // Toggle sorting order
    } else {
      this.sortColumn = column;
      this.sortAscending = true; // Default to ascending order
    }

    this.displayedTickets.sort((a, b) => {
      const valueA = this.getValue(a, column);
      const valueB = this.getValue(b, column);

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortAscending ? valueA - valueB : valueB - valueA;
      }

      if (valueA < valueB) return this.sortAscending ? -1 : 1;
      if (valueA > valueB) return this.sortAscending ? 1 : -1;
      return 0;
    });
  }

  private getValue(ticket: any, column: string): any {
    switch (column) {
      case 'id':
        return ticket.id;
      case 'status':
        return ticket.status;
      case 'requesterName':
        return ticket.requester?.name;
      case 'request':
        return ticket.request;
      case 'locationName':
        return ticket.location?.locationName;
      case 'locationRegion':
        return ticket.location?.region;
      case 'startDate':
        return new Date(ticket.startDate);
      case 'lastInteraction':
        console.log(`Parsing lastInteraction duration: ${ticket.lastInteraction}`);
        return this.parseDuration(ticket.lastInteraction);
      default:
        return '';
    }
  }

  private parseDuration(duration: string): number {
    const now = Date.now();
    const match = duration.match(/(?:(\d+)d)?\s*(?:(\d+)h)?/);
    if (!match) return now; // Default to now if format is invalid

    const days = parseInt(match[1] || '0', 10);
    const hours = parseInt(match[2] || '0', 10);

    const totalMilliseconds = (days * 24 + hours) * 60 * 60 * 1000;
    return now - totalMilliseconds;
  }
}
