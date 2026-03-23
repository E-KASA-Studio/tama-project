import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe} from '@ngx-translate/core';
import { ScrollRevealDirective } from '../../../shared/ui/scroll-reveal.directive';


@Component({
  selector: 'app-company',
  imports: [CommonModule, TranslatePipe,ScrollRevealDirective],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompanyComponent {
    model: string = 'image/Dark Gold Open.glb';
}
