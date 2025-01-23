import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TicketManagerComponent } from './pages/ticket-manager/ticket-manager.component';
import { FooterComponent } from './components/footer/footer.component';
import { Subscription } from 'rxjs';
import { AplicationThemeService } from './services/aplication-theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, TicketManagerComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ticket-management-app';

  private themeSubscription: Subscription | undefined;
  private themeService = inject(AplicationThemeService);

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(isDark => {
      // This is not ideal but it is safe to set to true initially on every load, since it is already checking localStorage
      this.themeService.setDarkTheme(isDark)
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
