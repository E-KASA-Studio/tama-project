import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";
import { LanguageService } from '../../core/services/language.service';
import { AVAILABLE_LANGUAGES, LanguageCode } from '../../core/services/models/language.model';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  languageService = inject(LanguageService);
  readonly languages = AVAILABLE_LANGUAGES;
  readonly LanguageCode = LanguageCode;

  isMenuOpen = signal(false);
  currentLanguage = signal<'en' | 'ru'>('en');

  toggleMenu() {
    this.isMenuOpen.update(state => !state);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

}

