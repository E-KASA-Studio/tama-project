import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-company',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompanyComponent {
    model: string = 'image/Dark Gold Open.glb';
}
