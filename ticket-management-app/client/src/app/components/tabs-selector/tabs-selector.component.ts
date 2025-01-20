import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs-selector',
  imports: [CommonModule],
  templateUrl: './tabs-selector.component.html',
  styleUrl: './tabs-selector.component.css'
})
export class TabsSelectorComponent {
  tabs = [
    { label: 'Chamados', icon: 'fa fa-headset' },
    { label: 'Arquivo', icon: 'fa fa-archive' },
  ];

  selectedTab: number = 0;

  selectTab(index: number): void {
    this.selectedTab = index;
  }
}
