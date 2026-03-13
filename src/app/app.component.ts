import { Component, inject } from '@angular/core';
import { HeroComponent } from './features/sections/hero/hero.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HeroComponent, TranslatePipe ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  translate = inject(TranslateService);
  constructor() {
    this.translate.setDefaultLang('ru');
    this.translate.use('ru');
  }
  title = 'tama-project';
}
