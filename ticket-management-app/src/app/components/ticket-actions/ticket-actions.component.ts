import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-ticket-actions',
    standalone: true,
    imports: [MatButtonModule, MatFormFieldModule, MatButtonToggleModule, MatIconModule, MatInputModule, MatTooltipModule],
    templateUrl: './ticket-actions.component.html',
    styleUrl: './ticket-actions.component.scss'
})
export class TicketActionsComponent {
    @Output() searchChange = new EventEmitter<string>();
    @Output() showTableChange = new EventEmitter<string>();

    searchTerm = '';
    showTable: string = "table";

    @ViewChild('group') group!: MatButtonToggleGroup;


    handleSearchTermChange(event: Event) {
        this.searchTerm = (event.target as HTMLInputElement).value;
        /*debug*///console.log('Search term emitted:', this.searchTerm);
        this.searchChange.emit(this.searchTerm);
    }

    handleShowTableChange(showTable: string) {
        this.showTable = showTable;
        this.showTableChange.emit(this.showTable);
    }
}