import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from '../features/landing-page/landing-page.component';
import { ScrollToTopButtonComponent } from '../shared/ui/scroll-to-top-button/scroll-to-top-button.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, LandingPageComponent, ScrollToTopButtonComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
