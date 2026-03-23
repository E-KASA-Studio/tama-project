
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
      } else {
        this.hide();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    this.observer.observe(this.el.nativeElement);
  }
  
  private reveal(): void {
    const nativeEl = this.el.nativeElement;
    nativeEl.classList.remove('opacity-0', 'translate-y-8');
    nativeEl.classList.add('opacity-100', 'translate-y-0');
    
  }
  private hide(): void {
    const nativeEl = this.el.nativeElement;
    nativeEl.classList.remove('opacity-100', 'translate-y-0');
    nativeEl.classList.add('opacity-0', 'translate-y-8');
  }

  private cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}