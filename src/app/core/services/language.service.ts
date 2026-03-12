import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LanguageCode, AVAILABLE_LANGUAGES } from "./models/language.model";
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly translate = inject(TranslateService);
  private readonly STORAGE_KEY = 'user_lang';

  readonly currentLanguage = signal<LanguageCode>(this.getInitialLang());

  constructor() {
    this.translate.use(this.currentLanguage());
  }

  getInitialLang(): LanguageCode {
    if (!this.isBrowser) {
      return LanguageCode.RU;
    }
    const savedLang = localStorage.getItem(this.STORAGE_KEY) as LanguageCode;
    const isValid = AVAILABLE_LANGUAGES.some(lang => lang.code === savedLang);

    return isValid ? savedLang : LanguageCode.RU;
  }

  switchLanguage(lang: LanguageCode) {
      this.currentLanguage.set(lang);
      this.translate.use(lang);
      
      if (this.isBrowser) {
        try {
          localStorage.setItem(this.STORAGE_KEY, lang);
        } catch (e) {
          console.warn('Could not save language preference to localStorage', e);
        }
      }
  }

}