import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category-filters',
  imports: [CommonModule],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.css'
})
export class CategoryFiltersComponent {
  filters = [
    { label: 'Remoto', icon: 'fa fa-headset', active: true },
    { label: 'Presencial', icon: 'fa fa-person-running', active: false },
    { label: 'Hardware', icon: 'fa fa-screwdriver-wrench', active: false },
    { label: 'Almoxarifado', icon: 'fa fa-cubes', active: false },
    { label: 'Gestão de Redes', icon: 'fa fa-diagram-project', active: false },
    { label: 'Gestão de Telefonia', icon: 'fa fa-phone-volume', active: false },
    { label: 'Manutenção Redes', icon: 'fa fa-network-wired', active: false },
    { label: 'Manutenção Telefonia', icon: 'fa-solid fa-tower-cell', active: false },
    { label: 'Garantia', icon: 'fa fa-box', active: false },
    { label: 'Todos', icon: 'fa fa-magnifying-glass', active: false }
  ];

  selectedFilter = this.filters.find((filter) => filter.active)?.label || 'Remoto';

  activateFilter(index: number): void {
    this.filters.forEach((filter, i) => filter.active = i === index);
    this.selectedFilter = this.filters[index].label;
  }

  onDropdownChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const index = this.filters.findIndex((filter) => filter.label === selectedValue);
    if (index !== -1) {
      this.activateFilter(index);
    }
  }
}
