import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-filters',
  imports: [CommonModule],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.css'
})
export class CategoryFiltersComponent {
  @Output() queueSelected = new EventEmitter<string>();
  
  filters = [
    { label: 'Remoto', queue: 'remote', icon: 'fa fa-headset', active: true },
    { label: 'Presencial', queue: 'on site', icon: 'fa fa-person-running', active: false },
    { label: 'Hardware', queue: 'maintenance', icon: 'fa fa-screwdriver-wrench', active: false },
    { label: 'Almoxarifado', queue: 'warehouse', icon: 'fa fa-cubes', active: false },
    { label: 'Gestão de Redes', queue: 'network management', icon: 'fa fa-diagram-project', active: false },
    { label: 'Gestão de Telefonia', queue: 'telephony management', icon: 'fa fa-phone-volume', active: false },
    { label: 'Manutenção Redes', queue: 'network maintenance', icon: 'fa fa-network-wired', active: false },
    { label: 'Manutenção Telefonia', queue: 'telephony maintenance', icon: 'fa-solid fa-tower-cell', active: false },
    { label: 'Garantia', queue: 'warrant', icon: 'fa fa-box', active: false },
    { label: 'Todos', queue: '', icon: 'fa fa-magnifying-glass', active: false }
  ];

  isMenuOpen = false;
  selectedFilter = this.filters.find((filter) => filter.active)?.queue || 'Remoto';

    activateFilter(index: number) {
      this.filters.forEach(filter => filter.active = false);
      this.filters[index].active = true;
      this.selectedFilter = this.filters[index].label
      this.isMenuOpen = false;

      this.queueSelected.emit(this.filters[index].queue);
  }

  onDropdownChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const index = this.filters.findIndex((filter) => filter.label === selectedValue);
    if (index !== -1) {
      this.activateFilter(index);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
