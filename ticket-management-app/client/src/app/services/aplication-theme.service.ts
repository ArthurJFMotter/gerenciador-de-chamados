import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AplicationThemeService {

  private isDarkMode = new BehaviorSubject<boolean>(false); // Default to light mode
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {
    // Check localStorage on startup for user preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      this.setDarkTheme(true);
    }
  }

  setDarkTheme(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Store preference
    this.updateBodyClass(isDark);
  }

  toggleTheme(): void {
    this.setDarkTheme(!this.isDarkMode.value);
  }

  private updateBodyClass(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}