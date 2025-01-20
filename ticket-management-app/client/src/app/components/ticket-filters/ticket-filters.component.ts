import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-filters',
  imports: [CommonModule],
  templateUrl: './ticket-filters.component.html',
  styleUrl: './ticket-filters.component.css'
})
export class TicketFiltersComponent {
  showTable: boolean = true;
  @Output() showTableChange = new EventEmitter<boolean>();

  toggleView() {
    this.showTable = !this.showTable;
    this.showTableChange.emit(this.showTable);
  }
}
