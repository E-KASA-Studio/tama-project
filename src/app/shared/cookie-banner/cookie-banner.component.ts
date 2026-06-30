import { Component, afterNextRender } from '@angular/core';
import { TranslatePipe, TranslateModule} from '@ngx-translate/core';


@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css',
  imports: [TranslateModule, TranslatePipe]
})
export class CookieBannerComponent {

  visible = false;

  constructor() {
    afterNextRender(() => {
      this.visible = !localStorage.getItem('cookie-consent');
    });
  }

  accept(): void {
    localStorage.setItem('cookie-consent', 'accepted');
    this.visible = false;
  }
}