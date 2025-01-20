import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() tickets: Ticket[] = [];
  startItem: number = 0;
  endItem: number = 0;
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;

 ngOnChanges(changes: SimpleChanges): void {
   if (changes['tickets']) {
     this.updatePagination();
   }
 }

  updatePagination() {
    this.totalItems = this.tickets.length;
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
     this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

}