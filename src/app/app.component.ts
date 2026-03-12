import { Component, inject } from '@angular/core';
import { HeroComponent } from './features/sections/hero/hero.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
<<<<<<< HEAD
import { HeroComponent } from "./features/sections/hero/hero.component";
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, TranslatePipe],
=======
import { HeroComponent } from "./features/sections/hero/hero.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HeroComponent],
>>>>>>> 162abd0 (feat: import HeroComponent)
  imports: [RouterOutlet, NavbarComponent, HeroComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  translate = inject(TranslateService);


  title = 'tama-project';
}
