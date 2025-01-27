import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-filters',
  templateUrl: './ticket-filters.component.html',
  styleUrls: ['./ticket-filters.component.css']
})
export class TicketFiltersComponent {
  @Output() searchTermChange = new EventEmitter<string>();

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTermChange.emit(input.value);
  }
}
