import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
  AfterViewInit
} from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-ticket-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.scss']
})
export class TicketTableComponent implements OnInit, OnChanges, AfterViewInit {
  ticketService = inject(TicketService);
  dateService = inject(DateService);

  @Input() allTickets: Ticket[] = [];
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 15;
  @Input() searchTerm: string = '';

  displayedTickets = new MatTableDataSource<Ticket>([]);
  displayedColumns: string[] = ['id', 'status', 'requester.name', 'request', 'location.name', 'location.region', 'createdDate', 'lastInteraction', 'responsible'];

  columnConfig: { [key: string]: { name: string; icon: string } } = {
    id: { name: 'ID', icon: 'tag' },
    status: { name: 'Status', icon: 'flag' },
    request: { name: 'Solicitação', icon: 'assignment' },
    'requester.name': { name: 'Solicitante', icon: 'account_circle' },
    'location.name': { name: 'Localização', icon: 'place' },
    'location.region': { name: 'Região', icon: 'map' },
    createdDate: { name: 'Data', icon: 'today' },
    lastInteraction: { name: '', icon: 'update' },
    responsible: { name: 'Responsável', icon: 'person' },
  };

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.updateDisplayedTickets();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTickets'] || changes['currentPage'] || changes['pageSize'] || changes['searchTerm']) {
      this.updateDisplayedTickets();
    }
  }

  ngAfterViewInit(): void {
        this.displayedTickets.sort = this.sort;
  }

  updateDisplayedTickets(): void {
    const filteredTickets = this.filterTickets(this.allTickets, this.searchTerm);
  
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    this.displayedTickets.data = filteredTickets.slice(startIndex, endIndex).map(ticket => ({
      ...ticket,
      createdDate: this.dateService.formatDate(ticket.createdDate),
    }));
  }
  
  filterTickets(tickets: Ticket[], term: string): Ticket[] {
    if (!term) return tickets;

    const lowerCaseTerm = term.toLowerCase();

    return tickets.filter(ticket =>
      ticket.id.toString().includes(lowerCaseTerm) ||
      ticket.responsible?.toLowerCase().includes(lowerCaseTerm) ||
      ticket.requester?.name.toLowerCase().includes(lowerCaseTerm) ||
      ticket.request?.toLowerCase().includes(lowerCaseTerm) ||
      ticket.location?.name.toLowerCase().includes(lowerCaseTerm) ||
      ticket.location?.region.toLowerCase().includes(lowerCaseTerm) ||
      ticket.createdDate?.toLowerCase().includes(lowerCaseTerm) ||
      ticket.lastInteraction?.toLowerCase().includes(lowerCaseTerm)
    );
  }
}