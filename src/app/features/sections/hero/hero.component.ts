import { Component, inject, signal } from '@angular/core';
import { TranslatePipe} from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';


@Component({
  selector: 'app-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  protected readonly langService = inject(LanguageService);
  
  readonly isLoaded = this.langService.isLoaded;
}
