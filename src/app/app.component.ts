import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { CompanyComponent } from './components/company/company.component';
import { ProductComponent } from './components/product/product.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [HeroComponent, CompanyComponent, ProductComponent, ContactsComponent, RouterOutlet, NavbarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'tama-project';
}
