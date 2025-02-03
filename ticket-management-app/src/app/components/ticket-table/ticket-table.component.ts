import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
  AfterViewInit
} from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DateService } from '../../services/date.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
    selector: 'app-ticket-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './ticket-table.component.html',
    styleUrls: ['./ticket-table.component.scss']
})
export class TicketTableComponent implements OnInit, OnChanges, AfterViewInit {
    ticketService = inject(TicketService);
    dateService = inject(DateService);

    @Input() allTickets: Ticket[] = [];
    @Input() currentPage: number = 1;
    @Input() pageSize: number = 15;
    @Input() searchTerm: string = '';
    @Input() columnConfig: string[] = []; // Receive the column config

    displayedColumns: string[] = [];
    dataSource = new MatTableDataSource<Ticket>([]);
    selection = new SelectionModel<Ticket>(true, []);

    ngOnInit(): void {
        this.displayedColumns = [...this.columnConfig]; // set the columns from the received configuration
        this.updateDisplayedTickets();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['allTickets'] || changes['currentPage'] || changes['pageSize'] || changes['searchTerm'] || changes['columnConfig']) {
            this.displayedColumns = [...this.columnConfig];
            this.updateDisplayedTickets();
            this.selection.clear();
        }
    }

    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;

        this.dataSource.sortingDataAccessor = (data: Ticket, sortHeaderId: string): string | number => {
            if (sortHeaderId === 'createdDate' ) {
                return this.dateService.parseDate(data[sortHeaderId])?.getTime() || 0;
            }
            if (sortHeaderId === 'lastInteraction') {
                return this.dateService.parseDate(this.allTickets.find(ticket => ticket.id === data.id)?.lastInteraction || '')?.getTime() || 0;
            }

            return (data as any)[sortHeaderId];
        };
    }

    updateDisplayedTickets(): void {
        const filteredTickets = this.filterTickets(this.allTickets, this.searchTerm);

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        this.dataSource.data = filteredTickets.slice(startIndex, endIndex).map(ticket => ({
            ...ticket,
            lastInteraction: this.dateService.timeSince(ticket.lastInteraction),
        }));
         this.dataSource._updateChangeSubscription();
    }

    filterTickets(tickets: Ticket[], term: string): Ticket[] {
        if (!term) return tickets;

        const lowerCaseTerm = term.toLowerCase();

        return tickets.filter(ticket =>
            ticket.id.toString().includes(lowerCaseTerm) ||
            ticket.responsible?.toLowerCase().includes(lowerCaseTerm) ||
            ticket.requesterName.toLowerCase().includes(lowerCaseTerm) ||
            ticket.request?.toLowerCase().includes(lowerCaseTerm) ||
            ticket.locationName.toLowerCase().includes(lowerCaseTerm) ||
            ticket.locationRegion.toLowerCase().includes(lowerCaseTerm) ||
            ticket.createdDate?.toLowerCase().includes(lowerCaseTerm) ||
            ticket.lastInteraction?.toLowerCase().includes(lowerCaseTerm)
        );
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Ticket): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

}