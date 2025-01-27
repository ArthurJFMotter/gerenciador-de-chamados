import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ticket-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.scss']
})
export class TicketTableComponent implements OnInit, OnChanges {
  ticketService = inject(TicketService);
  dateService = inject(DateService);

  @Input() allTickets: Ticket[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 15;
  @Input() searchTerm: string = '';

  displayedTickets = new MatTableDataSource<Ticket>([]);
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

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.updateDisplayedTickets();
    this.displayedTickets.sort = this.sort;
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
    this.displayedTickets.data = filteredTickets.slice(startIndex, endIndex);
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
}