import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() tickets: Ticket[] = [];
  @Input() pageSizeOptions: number[] = [15, 25, 50, 100, 200];
  @Output() pageChanged = new EventEmitter<{ page: number, pageSize: number }>(); 
  @Output() pageSizeChanged = new EventEmitter<number>(); 
  currentPage: number = 1;
  pageSize: number = 15; // Default page size
  startItem: number = 1;
  endItem: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tickets']) {
      this.updatePagination();
    }
  }

  ngOnInit(): void {
    this.updatePagination();
  }

  onPageSizeChange(event: Event): void {
    const newPageSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pageSize = newPageSize;
    this.currentPage = 1;
    this.updatePagination();
    this.pageSizeChanged.emit(this.pageSize);
    this.pageChanged.emit({ page: this.currentPage, pageSize: this.pageSize });

  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      this.pageChanged.emit({ page: this.currentPage, pageSize: this.pageSize });
    }
  }

  nextPage(): void {
    if (this.endItem < this.tickets.length) {
      this.currentPage++;
      this.updatePagination();
      this.pageChanged.emit({ page: this.currentPage, pageSize: this.pageSize });
    }
  }

  updatePagination(): void {
    this.startItem = (this.currentPage - 1) * this.pageSize + 1;
    this.endItem = Math.min(this.currentPage * this.pageSize, this.tickets.length);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages()) {
      this.currentPage = pageNumber;
      this.updatePagination();
      this.pageChanged.emit({ page: this.currentPage, pageSize: this.pageSize });
    }
  }

  totalPages(): number {
    return Math.ceil(this.tickets.length / this.pageSize);
  }

  getPagesArray(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }

}