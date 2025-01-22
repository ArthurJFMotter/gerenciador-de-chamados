import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view-buttons',
  imports: [CommonModule],
  templateUrl: './view-buttons.component.html',
  styleUrl: './view-buttons.component.css'
})
export class ViewButtonsComponent {
  showTable: boolean = true;
  @Output() showTableChange = new EventEmitter<boolean>();

  toggleView() {
    this.showTable = !this.showTable;
    this.showTableChange.emit(this.showTable);
  }
}
