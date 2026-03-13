import { Component, inject } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [TranslatePipe, NavbarComponent, LandingPageComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  translate = inject(TranslateService);

  title = 'tama-project';
}
