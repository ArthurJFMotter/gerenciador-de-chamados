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

  columnConfig: { [key: string]: ColumnConfig } = {
    id: { label: 'id', name: '' },
    status: { label: 'status', name: 'Status' },
    requestername: { label: 'requesterName', name: 'Solicitante' },
    request: { label: 'request', name: 'Solicitação' },
    locationname: { label: 'locationName', name: 'Localização' },
    locationregion: { label: 'locationRegion', name: 'Região' },
    startdate: { label: 'startDate', name: 'Data' },
    lastinteraction: { label: 'lastInteraction', name: '' },
    selection: { label: 'selection', name: '' },
  };
  displayedColumns: string[] = Object.keys(this.columnConfig);
}