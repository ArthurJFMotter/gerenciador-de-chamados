import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TicketTableComponent } from '../../components/ticket-table/ticket-table.component';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { BehaviorSubject, catchError, of, Subject, takeUntil } from 'rxjs';
import { Ticket, TicketService } from '../../services/ticket.service';
import { MatTabsModule, MatTabChangeEvent} from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
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
  imports: [
    CommonModule,
    TicketTableComponent,
    TicketCardComponent,
    MatTabsModule,
    MatChipsModule,
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
export class PanelComponent implements OnInit, OnDestroy {
  ticketService = inject(TicketService);

  showTable: string = 'table';
  loading = true;
  private destroy$ = new Subject<void>();
  selectedQueue = new BehaviorSubject<string>('remote');

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

  handleShowTableChange(showTable: string) {
    this.showTable = showTable;
  }

  updateQueue(event : MatTabChangeEvent){
    this.selectedQueue.next(event.tab.textLabel.toLocaleLowerCase().replace(' ', '-'));
  }

  onPageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}