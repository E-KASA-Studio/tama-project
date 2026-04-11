import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  imports: [],
  templateUrl: './scroll-to-top-button.component.html',
  styleUrl: './scroll-to-top-button.component.css'
})
export class ScrollToTopButtonComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  bottomOffsetPx = 16;

  ngOnInit(): void {
    this.updateBottomOffset();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateBottomOffset();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateBottomOffset();
  }

  private updateBottomOffset(): void {
    if (!this.isBrowser || !this.document.defaultView) {
      return;
    }

    const footer = this.document.querySelector('footer[aria-label="Footer"]') as HTMLElement | null;
    const baseOffset = this.document.defaultView.innerWidth >= 768 ? 24 : 16;

    if (!footer) {
      this.bottomOffsetPx = baseOffset;
      return;
    }

    const footerTop = footer.getBoundingClientRect().top;
    const viewportHeight = this.document.defaultView.innerHeight;

    if (footerTop >= viewportHeight) {
      this.bottomOffsetPx = baseOffset;
      return;
    }

    const overlapOffset = Math.ceil(viewportHeight - footerTop) + 16;
    this.bottomOffsetPx = Math.max(baseOffset, overlapOffset);
  }
}
