import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  // Customize the labels as needed
  override itemsPerPageLabel = 'Tickets por página:';
  override nextPageLabel     = 'Próximo >>';
  override previousPageLabel = '<< Anterior';
  override firstPageLabel    = 'Primeira página';
  override lastPageLabel     = 'Última página';

  // Optionally, override getRangeLabel to change the range text (e.g., "1 - 10 of 100")
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }
}
