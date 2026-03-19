import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from "@angular/router";
import { LandingScrollService } from '../../features/services/landing-scroll.service';




@Component({
  selector: 'app-navbar',
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

constructor(private scrollService: LandingScrollService) {}

onNavClick(sectionId: string) {
  this.scrollService.scrollToSection(sectionId);
}
  isMenuOpen = signal(false);
  currentLanguage = signal<'en' | 'ru'>('en');

  toggleMenu() {
    this.isMenuOpen.update(state => !state);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

}

