import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Router, RouterLink, Scroll } from "@angular/router";
import { LanguageService } from '../../core/services/language.service';
import { AVAILABLE_LANGUAGES, LanguageCode } from '../../core/services/models/language.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';


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
  private lastScrollY = 0;
  private readonly hideOffset = 80;
  private readonly scrollThreshold = 8;

  isMenuOpen = signal(false);
  isNavbarHidden = signal(false);
  currentLanguage = signal<'en' | 'ru'>('en');
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  constructor() {
  this.router.events.pipe(
    filter(e => e instanceof Scroll),
    takeUntilDestroyed()
  ).subscribe((e: Scroll) => {
    if (e.anchor) {
      const anchor = e.anchor;
      setTimeout(() => {
        this.document.getElementById(anchor)
  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    }
  });
}
  readonly isLoaded = this.languageService.isLoaded;

  toggleMenu() {
    this.isMenuOpen.update(state => !state);
    this.isNavbarHidden.set(false);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.isNavbarHidden.set(false);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - this.lastScrollY;

    if (currentScrollY <= 0 || this.isMenuOpen()) {
      this.isNavbarHidden.set(false);
      this.lastScrollY = currentScrollY;
      return;
    }

    if (Math.abs(scrollDelta) < this.scrollThreshold) {
      return;
    }

    if (scrollDelta > 0 && currentScrollY > this.hideOffset) {
      this.isNavbarHidden.set(true);
    } else if (scrollDelta < 0) {
      this.isNavbarHidden.set(false);
    }

    this.lastScrollY = currentScrollY;
  }

}

