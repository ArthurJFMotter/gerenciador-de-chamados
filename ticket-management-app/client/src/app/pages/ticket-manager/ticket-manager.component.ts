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
    PaginationComponent
  ],
  templateUrl: './ticket-manager.component.html',
  styleUrl: './ticket-manager.component.css'
})
export class TicketManagerComponent implements OnInit, OnDestroy {
  showTable: boolean = true;
  private destroy$ = new Subject<void>();
  allTickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  selectedQueue = new BehaviorSubject<string>('');
  loading = true;
  error: string | null = null;

  ticketService = inject(TicketService);

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
  }

  handleShowTableChange(showTable: boolean) {
    this.showTable = showTable;
  }

  updateQueue(queue: string) {
    this.selectedQueue.next(queue)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}