import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';

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
    requesterName: { label: 'requesterName', name: 'Solicitante' },
    request: { label: 'request', name: 'Solicitação' },
    locationName: { label: 'locationName', name: 'Local' },
    locationRegion: { label: 'locationRegion', name: 'Região' },
    startDate: { label: 'startDate', name: 'Data' },
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
        return this.formatDateToDayMonthYear(ticket.startDate);
      case 'lastInteraction':
        return this.formatDateToDayMonthYear(ticket.lastInteraction);
      default:
        return '';
    }
  }

  formatDateToDayMonthYear(dateString: string): string | null {
    // Expected date string format: "dd/mm/yyyy - hh:mm:ss"

    if (!dateString) {
      return null; // Or throw an error, depending on your preference
    }

    try {
      // Split the string at the space to separate the date and time parts
      const parts = dateString.split(" - ");
      if (parts.length !== 2) {
        return null; // Invalid format
      }

      const datePart = parts[0];

      // Validate the date format using a regular expression
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(datePart)) {
        return null; // Invalid date format
      }


      return datePart; // Return only the "dd/mm/yyyy" part

    } catch (error) {
      console.error("Error parsing date:", error);
      return null; // Indicate parsing failure
    }
  }
}