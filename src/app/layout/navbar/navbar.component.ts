import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  currentLanguage = signal<'en' | 'ru'>('en');

  toggleMenu() {
    this.isMenuOpen.update(state => !state);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  setLanguage(lang: 'en' | 'ru') {
    this.currentLanguage.set(lang);
    this.closeMenu();
  }

  scrollToSection(sectionId: string) {
    this.closeMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
