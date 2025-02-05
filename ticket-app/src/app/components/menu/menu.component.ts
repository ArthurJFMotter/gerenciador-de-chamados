import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

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
  router = inject(Router);
  @Input() isMenuOpen: boolean = false;
  @Output() closeMenu = new EventEmitter<void>();

  menuOpenClass: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isMenuOpen']) {
      this.menuOpenClass = this.isMenuOpen ? 'open' : '';
    }
  }
}