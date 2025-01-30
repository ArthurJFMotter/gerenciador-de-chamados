import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TicketTableComponent } from '../../components/ticket-table/ticket-table.component';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { Ticket, TicketService } from '../../services/ticket.service';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    TicketTableComponent,
    TicketCardComponent,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatButtonModule,
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

  @ViewChild('group') group!: MatButtonToggleGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.loading = true;
    this.ticketService.getTickets()
      .subscribe(tickets => {
        this.allTickets = tickets;
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
    if (queue) {
      this.filteredTickets = this.allTickets.filter(ticket => ticket.queue === queue);
    } else {
      this.filteredTickets = [...this.allTickets];
    }
    this.currentPage = 1; // Reset page on filter
      if(this.paginator) {
        this.paginator.firstPage();
    }
  }

  handleShowTableChange(showTable: string) {
    this.showTable = showTable;
  }

  onPageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

}