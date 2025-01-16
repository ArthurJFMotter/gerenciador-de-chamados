import { Component, OnInit } from '@angular/core';
import { TicketTableComponent } from '../../components/ticket-table/ticket-table.component';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { TabsSelectorComponent } from '../../components/tabs-selector/tabs-selector.component';
import { CategoryFiltersComponent } from '../../components/category-filters/category-filters.component';
import { TicketFiltersComponent } from '../../components/ticket-filters/ticket-filters.component';
import { Subject } from 'rxjs';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { AuxiliarButtonsComponent } from '../../components/auxiliar-buttons/auxiliar-buttons.component';

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
export class TicketManagerComponent implements OnInit {
  showTable: boolean = true;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
  }

  handleShowTableChange(showTable: boolean) {
    this.showTable = showTable;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}