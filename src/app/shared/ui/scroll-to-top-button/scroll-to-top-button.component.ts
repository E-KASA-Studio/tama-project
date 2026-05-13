import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  standalone: true,
  imports: [], // CommonModule больше не нужен, если используем @if
  templateUrl: './scroll-to-top-button.component.html'
})
export class ScrollToTopButtonComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  isVisible = signal<boolean>(false);
  bottomOffsetPx = signal<number>(16);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    const verticalOffset = window.pageYOffset 
      || this.document.documentElement.scrollTop 
      || this.document.body.scrollTop || 0;
    
    // Сначала обновляем состояние видимости
    const shouldBeVisible = verticalOffset > 300;
    this.isVisible.set(shouldBeVisible);

    // Вызываем расчет отступа, если мы близко к концу страницы или кнопка видна
    if (shouldBeVisible) {
      this.updateBottomOffset();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateBottomOffset();
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateBottomOffset();
    }
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private updateBottomOffset(): void {
    if (!this.isBrowser) return;

    // Ищем футер. Убедитесь, что селектор совпадает с тем, что в вашем HTML!
    const footer = this.document.querySelector('footer[aria-label="Footer"]') as HTMLElement | null;
    const win = this.document.defaultView;

    if (!win) return;

    const baseOffset = win.innerWidth >= 768 ? 24 : 16;

    if (!footer) {
      this.bottomOffsetPx.set(baseOffset);
      return;
    }

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = win.innerHeight;

    // Если верх футера выше, чем низ экрана — значит они пересекаются
    if (footerRect.top < viewportHeight) {
      const overlap = viewportHeight - footerRect.top;
      this.bottomOffsetPx.set(overlap + 16); // 16 - это дополнительный зазор от края футера
    } else {
      this.bottomOffsetPx.set(baseOffset);
    }
  }
}