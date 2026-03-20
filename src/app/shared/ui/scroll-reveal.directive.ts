import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // 1. Сразу вешаем класс "скрыто"
    this.renderer.addClass(this.el.nativeElement, 'reveal-hidden');

    // 2. Настраиваем наблюдатель
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 3. Когда элемент в кадре — добавляем класс видимости
          
          this.renderer.addClass(this.el.nativeElement, 'reveal-visible');
             // Небольшая задержка для плавности
          observer.unobserve(this.el.nativeElement); // Перестаем следить после активации
        }
      });
    }, {
      threshold: 0.1 // Сработает, когда 10% элемента появится на экране
    });

    observer.observe(this.el.nativeElement);
  }
}