import { Component, OnInit } from '@angular/core';
import { TranslatePipe} from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css',
  imports: [TranslateModule, TranslatePipe]
})
export class CookieBannerComponent implements OnInit {

  visible = false;

  ngOnInit(): void {
    this.visible = !localStorage.getItem('cookie-consent');
  }

  accept(): void {
    localStorage.setItem('cookie-consent', 'accepted');
    this.visible = false;
  }
}