import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild, HostBinding, Output, EventEmitter, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

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
    MatSidenavModule,
    MatListModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  @Input() isDarkMode: boolean = false;
  @Output() themeToggle = new EventEmitter<void>();
  @ViewChild('drawer') drawer!: MatDrawer;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.drawer.toggle();
  }

  toggleTheme() {
    this.themeToggle.emit();
  }
}
