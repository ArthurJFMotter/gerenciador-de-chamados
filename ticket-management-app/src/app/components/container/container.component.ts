import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements OnInit {
  showTable: boolean = false;

  ngOnInit(): void {
  }

  toggleView() {
    this.showTable = !this.showTable;
  }
}