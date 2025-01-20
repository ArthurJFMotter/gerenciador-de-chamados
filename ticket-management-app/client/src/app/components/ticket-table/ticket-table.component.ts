import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-table',
  imports: [CommonModule],
  templateUrl: './ticket-table.component.html',
  styleUrl: './ticket-table.component.css'
})
export class TicketTableComponent implements OnInit {
  ngOnInit(): void {
  }
  ticketService = inject(TicketService);
  @Input() tickets: Ticket[] = [];

  private sortDirection: { [key: number]: 'asc' | 'desc' } = {};


  sortRows(columnIndex: number) {
    const property = this.getColumnProperty(columnIndex);
    if (!property) return;

    this.sortDirection[columnIndex] = this.sortDirection[columnIndex] === 'asc' ? 'desc' : 'asc';
    const isAscending = this.sortDirection[columnIndex] === 'asc';

    try {
      this.tickets = sortTableAlphabetically(this.tickets, property, isAscending);
    } catch (error) {
      console.error(error);
    }
  }

  private getColumnProperty(columnIndex: number): string | null {
    switch (columnIndex) {
      case 0:
        return 'id';
      case 1:
        return 'status';
      case 2:
        return 'requester.name'
      case 3:
        return 'request';
      case 4:
        return 'location.locationName';
      case 5:
        return 'location.region';
      case 6:
        return 'startDate';
      case 7:
        return 'lastInteraction';
      case 8:
        return 'responsible'
      default:
        return null;
    }
  }
}

interface TableRow {
  [key: string]: any;
}

function sortTableAlphabetically<T extends TableRow>(
  table: T[],
  property: string,
  isAscending: boolean = true
): T[] {
  if (!table || table.length === 0) {
    return [];
  }

  // Check if property exists in the first row
  if (!table[0].hasOwnProperty(property.split('.')[0])) {
    throw new Error(`Property "${property}" not found in table rows.`)
  }

  const sortedTable = [...table];

  sortedTable.sort((a, b) => {
    const valueA = property.includes('.') ? property.split('.').reduce((o, i) => o[i], a) : a[property];
    const valueB = property.includes('.') ? property.split('.').reduce((o, i) => o[i], b) : b[property];

    let comparison = 0;

    if (valueA instanceof Date && valueB instanceof Date) {
      comparison = valueA.getTime() - valueB.getTime();
    } else {
      const stringA = String(valueA).toLowerCase();
      const stringB = String(valueB).toLowerCase();

      if (stringA < stringB) {
        comparison = -1;
      } else if (stringA > stringB) {
        comparison = 1;
      }
    }

    return isAscending ? comparison : -comparison;
  });

  return sortedTable;
}