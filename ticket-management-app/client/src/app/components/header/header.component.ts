import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AplicationThemeService } from '../../services/aplication-theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  themeService = inject(AplicationThemeService);
  isMenuOpen: boolean = false;

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}