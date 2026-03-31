import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  imports: [],
  templateUrl: './scroll-to-top-button.component.html',
  styleUrl: './scroll-to-top-button.component.css'
})
export class ScrollToTopButtonComponent implements AfterViewInit {
  bottomOffsetPx = 16;

  ngAfterViewInit(): void {
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
    const footer = document.querySelector('footer[aria-label="Footer"]') as HTMLElement | null;
    const baseOffset = window.innerWidth >= 768 ? 24 : 16;

    if (!footer) {
      this.bottomOffsetPx = baseOffset;
      return;
    }

    const footerTop = footer.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    if (footerTop >= viewportHeight) {
      this.bottomOffsetPx = baseOffset;
      return;
    }

    const overlapOffset = Math.ceil(viewportHeight - footerTop) + 16;
    this.bottomOffsetPx = Math.max(baseOffset, overlapOffset);
  }
}
