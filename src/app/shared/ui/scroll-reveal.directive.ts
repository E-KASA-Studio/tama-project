// import { Directive, ElementRef, OnInit, Renderer2, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Directive({
//   selector: '[appScrollReveal]',
//   standalone: true
// })
// export class ScrollRevealDirective implements OnInit, OnDestroy {
//   private observer: IntersectionObserver | null = null;

//   constructor(
//     private el: ElementRef,
//     private renderer: Renderer2,
//     @Inject(PLATFORM_ID) private platformId: Object // Проверка для SSR
//   ) {}

//   ngOnInit(): void {
//     // 1. Инициализируем стили сразу
//     this.renderer.addClass(this.el.nativeElement, 'reveal-hidden');

//     // 2. Запускаем наблюдатель только в браузере
//     if (isPlatformBrowser(this.platformId)) {
//       this.initObserver();
//     }
//   }

//   private initObserver(): void {
//     const options: IntersectionObserverInit = {
//       threshold: 0.1,
//       rootMargin: '0px 0px -50px 0px'
//     };

//     this.observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           this.reveal();
//         }
//       });
//     }, options);

//     this.observer.observe(this.el.nativeElement);
//   }

//   private reveal(): void {
//     this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
    
//     // 3. Отключаемся сразу после срабатывания
//     if (this.observer) {
//       this.observer.unobserve(this.el.nativeElement);
//       this.observer.disconnect();
//     }
//   }

//   ngOnDestroy(): void {
//     // 4. Чистим за собой, чтобы SonarCloud не ругался на утечки памяти
//     if (this.observer) {
//       this.observer.disconnect();
//     }
//   }
// }

import { 
  Directive, 
  ElementRef,   
  inject, 
  afterNextRender, 
  DestroyRef,
} from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective {
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.initStyles();
      this.initObserver();
    });

    this.destroyRef.onDestroy(() => this.cleanup());
  }

  private initStyles(): void {
    const nativeEl = this.el.nativeElement;
    nativeEl.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.reveal();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    this.observer.observe(this.el.nativeElement);
  }

  private reveal(): void {
    const nativeEl = this.el.nativeElement;
    nativeEl.classList.remove('opacity-0', 'translate-y-8');
    nativeEl.classList.add('opacity-100', 'translate-y-0');
    this.cleanup();
  }

  private cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}