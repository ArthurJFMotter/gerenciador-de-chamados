import { Component, OnInit } from '@angular/core';
import { TicketTableComponent } from '../../components/ticket-table/ticket-table.component';
import { CommonModule } from '@angular/common';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';

@Component({
  selector: 'app-ticket-manager',
  imports: [CommonModule, TicketTableComponent, TicketCardComponent],
  templateUrl: './ticket-manager.component.html',
  styleUrl: './ticket-manager.component.css'
})
export class TicketManagerComponent implements OnInit {
  showTable: boolean = false;

  ngOnInit(): void {
  }

  toggleView() {
    this.showTable = !this.showTable;
  }
}