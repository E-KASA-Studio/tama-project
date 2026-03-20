import { Component, inject } from '@angular/core';
import { CompanyComponent } from '../sections/company/company.component';
import { HeroComponent } from '../sections/hero/hero.component';
import { ContactsComponent } from "../sections/contacts/contacts.component";
import { ProductComponent } from "../sections/product/product.component";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [HeroComponent, ContactsComponent, ProductComponent, CompanyComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
    private readonly viewportScroller = inject(ViewportScroller);

  ngOnInit() {
    this.viewportScroller.setOffset([0, 60]);
  }
}


