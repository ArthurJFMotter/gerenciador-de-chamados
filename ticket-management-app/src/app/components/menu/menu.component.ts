import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnChanges {
  @Input() isMenuOpen: boolean = false; // Receive menu state from parent
  @Output() closeMenu = new EventEmitter<void>(); // Emit when the menu closes

  menuOpenClass: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isMenuOpen']) {
      this.menuOpenClass = this.isMenuOpen ? 'open' : '';
    }
  }

  close(): void {
    this.closeMenu.emit(); // Emit the event to notify the parent
  }
}