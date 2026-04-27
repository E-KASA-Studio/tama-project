import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common'; // Импортируем для работы директивы *ngIf


@Component({
  selector: 'app-scroll-to-top-button',
  standalone: true, // Убедитесь, что компонент standalone, если используете Angular 17+
  imports: [CommonModule],
  templateUrl: './scroll-to-top-button.component.html',
  styleUrl: './scroll-to-top-button.component.css'
})
export class ScrollToTopButtonComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Переменная для контроля видимости
  isVisible: boolean = false;

  // Слушаем прокрутку окна
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Показываем кнопку, если прокрутили больше чем на 300px (высота "первого экрана")
    const verticalOffset = window.pageYOffset 
      || document.documentElement.scrollTop 
      || document.body.scrollTop || 0;
      this.updateBottomOffset();

    this.isVisible = verticalOffset > 300;
  }

  // Метод для плавной прокрутки вверх
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  bottomOffsetPx = 16;

  ngOnInit(): void {
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
