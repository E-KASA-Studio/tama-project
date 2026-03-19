
import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from './features/sections/hero/hero.component';
import { ProductComponent } from './features/sections/product/product.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Meta } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, TranslatePipe ],


  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  translate = inject(TranslateService);

  title = 'tama-project';

  constructor(private meta: Meta) {}

  ngOnInit(): void {
    if (!environment.production) {
      this.meta.addTag({ name: 'robots', content: 'noindex, nofollow' });
    }
  }
}
