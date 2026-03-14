import { Component, inject } from '@angular/core';
import { HeroComponent } from './features/sections/hero/hero.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
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

  title = 'tama-project';
}
