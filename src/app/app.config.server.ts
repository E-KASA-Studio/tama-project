import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideTranslateLoader } from '@ngx-translate/core';
import { appConfig } from './app.config';
import { RuPrerenderLoader } from './core/i18n/ru-prerender.loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideTranslateLoader(RuPrerenderLoader),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
