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
  displayedColumns: string[] = ['id', 'status', 'requesterName', 'request', 'locationName', 'locationRegion', 'createdDate', 'lastInteraction', 'responsible', 'selection'];

  columnConfig: { [key: string]: { name: string; icon: string } } = {
    id: { name: 'ID', icon: 'tag' },
    status: { name: 'Status', icon: 'flag' },
    request: { name: 'Solicitação', icon: 'assignment' },
    requesterName: { name: 'Solicitante', icon: 'account_circle' },
    locationName: { name: 'Localização', icon: 'place' },
    locationRegion: { name: 'Região', icon: 'map' },
    createdDate: { name: 'Data', icon: 'event' },
    lastInteraction: { name: '', icon: 'update' },
    responsible: { name: 'Responsável', icon: 'person' },
    selection: { name: '', icon: 'checklist' },
  };

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.displayedTickets.data = this.allTickets;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTickets'] || changes['currentPage'] || changes['pageSize'] || changes['searchTerm']) {
      this.displayedTickets.data = this.allTickets;
    }
  }
}