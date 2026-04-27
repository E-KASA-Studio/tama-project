import { Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import ruTranslations from '../../../assets/i18n/ru.json';

@Injectable()
export class RuPrerenderLoader implements TranslateLoader {
  getTranslation(_lang: string): Observable<TranslationObject> {
    return of(ruTranslations as TranslationObject);
  }
}