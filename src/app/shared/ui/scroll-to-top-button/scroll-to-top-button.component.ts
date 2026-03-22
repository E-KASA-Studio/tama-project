import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  imports: [CommonModule],
  templateUrl: './scroll-to-top-button.component.html',
  styleUrl: './scroll-to-top-button.component.css'
})
export class ScrollToTopButtonComponent implements AfterViewInit {
  isVisible = false;

  ngAfterViewInit(): void {
    this.updateVisibility();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateVisibility();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateVisibility();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateVisibility(): void {
    const companySection = document.getElementById('company-section');

    if (!companySection) {
      this.isVisible = false;
      return;
    }

    const companyTop = window.scrollY + companySection.getBoundingClientRect().top;
    this.isVisible = window.scrollY >= companyTop;
  }

}
