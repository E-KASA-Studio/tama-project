import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from "@angular/common/http";

import { routes, routerOptions } from './app.routes';

import {provideTranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";


export const appConfig: ApplicationConfig = {
<<<<<<< HEAD
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, ...routerOptions, withInMemoryScrolling({anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })),
=======
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
>>>>>>> ad64a58 (feat: changed app config ts)
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'ru',
      lang: 'ru'
    })]
};
