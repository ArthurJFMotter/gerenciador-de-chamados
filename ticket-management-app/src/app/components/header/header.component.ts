import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;

  ngOnInit(): void {
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}