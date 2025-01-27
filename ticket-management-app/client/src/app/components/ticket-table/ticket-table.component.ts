import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-ticket-table',
  imports: [CommonModule],
  templateUrl: './ticket-table.component.html',
  styleUrl: './ticket-table.component.css'
})
export class TicketTableComponent implements OnInit, OnChanges {
  ticketService = inject(TicketService);
  dateService = inject(DateService);

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

       if (column === 'startDate'){
        const dateA = this.dateService.parseDate(valueA);
        const dateB = this.dateService.parseDate(valueB);
          if (dateA && dateB){
           return this.sortAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        }
        return 0;
      }

      if (column === 'lastInteraction'){
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
      case 'locationName':
        return ticket.location?.locationName;
      case 'locationRegion':
        return ticket.location?.region;
      case 'startDate':
         return this.dateService.formatDateToDayMonthYear(ticket.startDate);
        case 'lastInteraction':
            return ticket.lastInteraction;
      default:
        return '';
    }
  }
}