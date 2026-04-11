
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],


  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tama-project';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor(private meta: Meta) {}

  ngOnInit(): void {
    if (this.isBrowser && 'scrollRestoration' in globalThis.history) {
      globalThis.history.scrollRestoration = 'manual';
    }

    if (!environment.production) {
      this.meta.addTag({ name: 'robots', content: 'noindex, nofollow' });
    }
  }
}
