import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-manager',
  imports: [],
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