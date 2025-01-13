import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}