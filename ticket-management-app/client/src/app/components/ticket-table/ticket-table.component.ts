import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
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
export class TicketTableComponent implements OnInit {
  ticketService = inject(TicketService);
  @Input() tickets: Ticket[] = [];

  ngOnInit(): void {
    
  }
  
  columnConfig: { [key: string]: ColumnConfig } = {
    id: {label: 'id', name:'#ID'},
    status: {label: 'status', name:'Status'},
    requestername: {label: 'requesterName', name:'Solicitante'},
    request: {label: 'request', name:'Solicitação'},
    locationname: {label: 'locationName', name:'Localização'},
    locationregion: {label: 'locationRegion', name:'Região'},
    startdate: {label: 'startDate', name:'Data'},
    lastinteraction: {label: 'lastInteraction', name:'Última Interação'},
    selection: {label: 'selection', name:'Seleção'},
  };
  displayedColumns: string[] = Object.keys(this.columnConfig);
}