import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { Ticket, TicketService } from '../../services/ticket.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { TicketActionsComponent } from '../../components/ticket-actions/ticket-actions.component';
import { MatCardModule } from '@angular/material/card';
import { TicketTableComponent } from '../../components/ticket-table/ticket-table.component';

@Component({
  selector: 'app-view-archived',
  standalone: true,
  imports: [
    CommonModule,
    TicketTableComponent,
    TicketCardComponent,
    MatProgressSpinnerModule,
    PaginatorComponent,
    TicketActionsComponent,
    MatCardModule
  ],
  templateUrl: './view-archived.component.html',
  styleUrl: './view-archived.component.scss'
})
export class ViewArchivedComponent implements OnInit, OnChanges {
  ticketService = inject(TicketService);

  @Input() allTickets: Ticket[] = [];
  @Input() loading: boolean = true;
  @Input() error: string | null = null;
  @Input() selectedQueue: string = '';
  @Output() queueChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() showTableChange = new EventEmitter<string>();

  filteredTickets: Ticket[] = [];
  currentPage: number = 1;
  pageSize: number = 15;
  searchTerm: string = '';
  showTable: string = 'table';
  columnConfig: string[] = ['id', 'requesterName', 'request', 'locationName', 'queue', 'endDate', 'responsible', 'select'];
  
  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((tickets) => {
      this.allTickets = tickets
      this.filterTickets()
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTickets'] || changes['selectedQueue']) {
      this.filterTickets();
    }
  }

  filterTickets() {
    let filteredByQueue = this.allTickets;

    if (this.selectedQueue) {
      filteredByQueue = this.allTickets.filter(ticket => ticket.queue === this.selectedQueue);
    }

    if (this.searchTerm) {
      this.filteredTickets = filteredByQueue.filter(ticket =>
        Object.values(ticket).some(value =>
          value && typeof value === 'string' && value.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      this.filteredTickets = filteredByQueue;
    }

    this.currentPage = 1;
  }

  handleSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterTickets();
    this.searchChange.emit(searchTerm);
  }

  handleShowTableChange(showTable: string) {
    this.showTable = showTable;
    this.showTableChange.emit(showTable);
  }

  onPageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }
}
