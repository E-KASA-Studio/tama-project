import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LandingScrollService {

  constructor(private viewportScroller: ViewportScroller) {
    // Настройка смещения (например, если у тебя фиксированный navbar высотой 64px)
    this.viewportScroller.setOffset([0, 64]);
  }

  /**
   * Скролл к элементу по ID
   * @param elementId ID целевого элемента
   */
  scrollToSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
