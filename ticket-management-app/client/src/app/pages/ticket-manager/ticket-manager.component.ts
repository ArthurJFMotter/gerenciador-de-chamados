import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TicketTableComponent } from '../../components/ticket-table/ticket-table.component';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { TabsSelectorComponent } from '../../components/tabs-selector/tabs-selector.component';
import { CategoryFiltersComponent } from '../../components/category-filters/category-filters.component';
import { TicketFiltersComponent } from '../../components/ticket-filters/ticket-filters.component';
import { BehaviorSubject, catchError, of, Subject, takeUntil } from 'rxjs';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { AuxiliarButtonsComponent } from '../../components/auxiliar-buttons/auxiliar-buttons.component';
import { Ticket, TicketService } from '../../services/ticket.service';
import { ViewButtonsComponent } from '../../components/view-buttons/view-buttons.component';

@Component({
  selector: 'app-ticket-manager',
  imports: [
    CommonModule,
    TabsSelectorComponent,
    CategoryFiltersComponent,
    TicketFiltersComponent,
    AuxiliarButtonsComponent,
    TicketTableComponent,
    TicketCardComponent,
    PaginationComponent,
    ViewButtonsComponent
  ],
  templateUrl: './ticket-manager.component.html',
  styleUrl: './ticket-manager.component.css'
})
export class TicketManagerComponent implements OnInit, OnDestroy {
  ticketService = inject(TicketService);

  showTable: boolean = true;
  loading = true;
  private destroy$ = new Subject<void>();
  selectedQueue = new BehaviorSubject<string>('remote');

  allTickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  error: string | null = null;
  currentPage: number = 1;
  pageSize: number = 15;
  searchTerm = '';

  ngOnInit(): void {
    this.loadTickets();
    this.selectedQueue.pipe(takeUntil(this.destroy$)).subscribe(queue => {
      this.filterTickets(queue);
    });
  }

  loadTickets() {
    this.loading = true;
    this.ticketService.getTickets()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.error = 'Failed to load tickets';
          console.error('Error loading tickets:', error);
          this.loading = false;
          return of([]);
        })
      )
      .subscribe(tickets => {
        this.allTickets = tickets;
        this.filterTickets(this.selectedQueue.value);
        this.loading = false;
      });
  }

  filterTickets(queue: string) {
    if (queue) {
      this.filteredTickets = this.allTickets.filter(ticket => ticket.queue === queue);
    } else {
      this.filteredTickets = [...this.allTickets];
    }
    this.currentPage = 1; // Reset page on filter
  }

  handleShowTableChange(showTable: boolean) {
    this.showTable = showTable;
  }

  updateQueue(queue: string) {
    this.selectedQueue.next(queue)
  }

  onPageChanged(event: { page: number; pageSize: number }): void {
    this.currentPage = event.page;
    this.pageSize = event.pageSize;
  }

  onPageSizeChanged(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1; // Reset to first page
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}