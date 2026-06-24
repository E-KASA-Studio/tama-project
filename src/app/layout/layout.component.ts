import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from '../features/landing-page/landing-page.component';
import { ScrollToTopButtonComponent } from '../shared/ui/scroll-to-top-button/scroll-to-top-button.component';
import { CookieBannerComponent } from '../shared/cookie-banner/cookie-banner.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, LandingPageComponent, ScrollToTopButtonComponent, CookieBannerComponent, RouterModule],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

}
