import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from '../features/landing-page/landing-page.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FooterComponent, LandingPageComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
