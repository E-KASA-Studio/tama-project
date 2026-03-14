import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  navCompany = 'Company';
  navProduct = 'Product';
  navContacts = 'Contacts';

  company = 'TAMA CAPS, Ltd';
  address = '113925, City, Street, 00';
  email = 'test@tamacaps.kz';
  phone = '+XX XXX XX XX XX';

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const top = section.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
