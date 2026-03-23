import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
import { ScrollRevealDirective } from '../../../shared/ui/scroll-reveal.directive';

@Component({
  selector: 'app-contacts',
  imports: [TranslatePipe, ScrollRevealDirective],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  private readonly languageService = inject(LanguageService);

  private readonly emailKey = this.languageService.translationSignal('contactsSection.email');
  private readonly phoneKey = this.languageService.translationSignal('contactsSection.phone');
  private readonly addressKey = this.languageService.translationSignal('contactsSection.address');

  readonly emailHref = computed(() => `mailto:${this.emailKey()}`);

  readonly phoneHref = computed(() => 
    `tel:${this.phoneKey().replaceAll(/\s/g, '')}`
  );

  readonly mapsHref = computed(() => 
    `https://maps.google.com/?q=${encodeURIComponent(this.addressKey())}`
  );


}
