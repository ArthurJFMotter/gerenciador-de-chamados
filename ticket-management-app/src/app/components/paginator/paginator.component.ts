import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { CustomPaginatorIntl } from '../../services/customPaginatorIntl';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }
  ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() length: number = 0;
  @Input() pageSize: number = 15;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [15, 25, 50, 100, 200];

  @Output() pageChanged = new EventEmitter<PageEvent>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['length'] || changes['pageSize'] || changes['pageIndex']) {
      return;
    }
  }

  onPageChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }
}