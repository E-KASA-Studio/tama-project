import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductComponent implements OnInit, OnDestroy {
  models: string[] = [
    'image/Dark Green Open.glb',
    'image/Gold Open.glb',
    'image/Purple Open.glb'
  ];

  currentModelIndex: number = 0;
  private intervalId: any;

  // Геттер для получения текущего пути к модели
  get currentModel(): string {
    return this.models[this.currentModelIndex];
  }

  ngOnInit() {
    // 2. Запускаем таймер смены каждые 5000 мс (5 секунд)
    this.intervalId = setInterval(() => {
      this.nextModel();
    }, 5000);
  }

  ngOnDestroy() {
    // 3. Обязательно очищаем таймер при уничтожении компонента
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextModel() {
    this.currentModelIndex = (this.currentModelIndex + 1) % this.models.length;
  }


}
