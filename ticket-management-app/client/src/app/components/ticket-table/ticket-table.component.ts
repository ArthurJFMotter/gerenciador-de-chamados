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
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
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
      case 'locationName':
        return ticket.location?.locationName;
      case 'locationRegion':
        return ticket.location?.region;
      case 'startDate':
        return this.formatDateToDayMonthYear(ticket.startDate);
      case 'lastInteraction':
        const formattedDate = this.formatDateToValidISO(ticket.lastInteraction);
        return this.timeSince(formattedDate || "");
      default:
        return '';
    }
  }

  formatDateToDayMonthYear(dateString: string): string | null {
    // Expected date string format: "dd/mm/yyyy - hh:mm:ss"

    if (!dateString) {
      return null;
    }

    try {
      // Split the string at the space to separate the date and time parts
      const parts = dateString.split(" - ");
      if (parts.length !== 2) {
        return null;
      }

      const datePart = parts[0];

      // Validate the date format using a regular expression
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(datePart)) {
        return null;
      }


      return datePart; // Return only the "dd/mm/yyyy" part

    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  }

  formatDateToValidISO(dateString: string): string | null {
    if (!dateString) {
      return null;
    }

    try {
      const parts = dateString.split(" - ");
      if (parts.length !== 2) {
        return null;
      }

      const [datePart, timePart] = parts;

      const [day, month, year] = datePart.split("/");
      const [hours, minutes, seconds] = timePart.split(":");


      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    } catch (error) {
      console.error("Error formatting to valid ISO:", error);
      return null;
    }
  }


  timeSince(dateString: string): string {

    if (!dateString) {
      return 'Never';
    }

    try {
      const parsedDate = new Date(dateString);
      if (isNaN(parsedDate.getTime())) {
        return 'Invalid Date';
      }

      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `${diffInMinutes}min`;
      }

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours}h`;
      }

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 30) {
        return `${diffInDays}d`;
      }

      const diffInMonths = this.diffInMonths(parsedDate, now);
      return `${diffInMonths}m`;
    } catch (error) {
      console.error("Error calculating time since:", error);
      return 'Invalid Date';
    }
  }


  private diffInMonths(parsedDate: Date, now: Date): number {
    let months = (now.getFullYear() - parsedDate.getFullYear()) * 12;
    months -= parsedDate.getMonth();
    months += now.getMonth();

    return months <= 0 ? 0 : months;
  }
}