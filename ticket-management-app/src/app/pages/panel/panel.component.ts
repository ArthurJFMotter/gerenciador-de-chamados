import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TicketTableComponent } from '../../components/ticket-table/ticket-table.component';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { Ticket, TicketService } from '../../services/ticket.service';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { TicketActionsComponent } from '../../components/ticket-actions/ticket-actions.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    TicketActionsComponent,
    TicketTableComponent,
    TicketCardComponent,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit {
  ticketService = inject(TicketService);

  loading = true;
  showTable: string = 'table';
  selectedQueue: string = 'remote';

  readonly queues: string[] = ['remote', 'on site', 'maintenance', 'warehouse', 'network', 'telephony', 'warrant', ''];

  queueConfig: { [key: string]: { name: string; icon: string } } = {
    'remote': { name: 'Remoto', icon: 'headset_mic' },
    'on site': { name: 'Presencial', icon: 'directions_run' },
    'maintenance': { name: 'Manutenção', icon: 'build' },
    'warehouse': { name: 'Almoxarifado', icon: 'store' },
    'network': { name: 'Redes', icon: 'router' },
    'telephony': { name: 'Telefonia', icon: 'phone' },
    'warrant': { name: 'Garantia', icon: 'receipt' },
    '': { name: 'Todos', icon: 'reorder' },
  };

  allTickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  error: string | null = null;
  currentPage: number = 1;
  pageSize: number = 15;
  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.loading = true;
    this.ticketService.getTickets()
      .subscribe(tickets => {
        this.allTickets = tickets;
        /*debug*///console.log('allTickets:', this.allTickets);
        this.filterTickets(this.selectedQueue);
        this.loading = false;
      });
  }

  onTabChange(event: MatTabChangeEvent) {
    const tabIndex = event.index;
    this.selectedQueue = this.queues[tabIndex];
    this.filterTickets(this.selectedQueue);
  }

  filterTickets(queue: string) {
    let filteredByQueue = this.allTickets;

    if (queue) {
      filteredByQueue = this.allTickets.filter(ticket => ticket.queue === queue);
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
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }


  onPageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  handleSearchChange(searchTerm: string) {
    /*Debug*///console.log('Search term received:', searchTerm);
    this.searchTerm = searchTerm;
    this.filterTickets(this.selectedQueue);
  }
  handleShowTableChange(showTable: string) {
    this.showTable = showTable
  }

}