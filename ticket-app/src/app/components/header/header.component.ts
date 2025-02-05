import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);

  @Input() isDarkMode: boolean = false;
  isMenuOpen: boolean = false;
  @Output() themeToggle = new EventEmitter<void>();

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme(): void {
    this.themeToggle.emit();
  }

  onMenuClose(): void {
    this.isMenuOpen = false;
  }

  goToConsult(): void {
    this.router.navigate(['/consult']);
  }
}
