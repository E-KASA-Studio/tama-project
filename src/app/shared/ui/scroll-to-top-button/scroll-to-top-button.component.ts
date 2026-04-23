import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Импортируем для работы директивы *ngIf

@Component({
  selector: 'app-scroll-to-top-button',
  standalone: true, // Убедитесь, что компонент standalone, если используете Angular 17+
  imports: [CommonModule],
  templateUrl: './scroll-to-top-button.component.html',
  styleUrl: './scroll-to-top-button.component.css'
})
export class ScrollToTopButtonComponent {
  // Переменная для контроля видимости
  isVisible: boolean = false;

  // Слушаем прокрутку окна
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Показываем кнопку, если прокрутили больше чем на 300px (высота "первого экрана")
    const verticalOffset = window.pageYOffset 
      || document.documentElement.scrollTop 
      || document.body.scrollTop || 0;

    this.isVisible = verticalOffset > 300;
  }

  // Метод для плавной прокрутки вверх
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}