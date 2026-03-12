import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { LanguageCode } from './models/language.model';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';

describe('LanguageService', () => {
  let translate: TranslateService;
  const STORAGE_KEY = 'user_lang';

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        LanguageService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    translate = TestBed.inject(TranslateService);
    spyOn(translate, 'use').and.returnValue(of({}));
  });

  it('should initialize with default language (RU) when storage is empty', () => {

    const service = TestBed.inject(LanguageService);
    
    expect(service.currentLanguage()).toBe(LanguageCode.RU);
    expect(translate.use).toHaveBeenCalledWith(LanguageCode.RU);
  });

  it('should switch language correctly and save to localStorage', () => {
    const service = TestBed.inject(LanguageService);
    
    service.switchLanguage(LanguageCode.EN);

    expect(service.currentLanguage()).toBe(LanguageCode.EN);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(LanguageCode.EN);
    expect(translate.use).toHaveBeenCalledWith(LanguageCode.EN);
  });

  it('should read language from localStorage on startup', () => {
    localStorage.setItem(STORAGE_KEY, LanguageCode.EN);

    const service = TestBed.inject(LanguageService);

    expect(service.currentLanguage()).toBe(LanguageCode.EN);
    expect(translate.use).toHaveBeenCalledWith(LanguageCode.EN);
  });

  it('should fallback to RU if localStorage has invalid value', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid_lang' as any);
    
    const service = TestBed.inject(LanguageService);

    expect(service.currentLanguage()).toBe(LanguageCode.RU);
  });

  describe('Server Side Environment', () => {
    beforeEach(() => {
      // Для тестов сервера нам нужно сбросить модуль и подменить платформу
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideTranslateService(),
          LanguageService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      translate = TestBed.inject(TranslateService);
      spyOn(translate, 'use').and.returnValue(of({}));
    });

    it('should always return RU when on server platform', () => {
      // Предварительно кладем EN в сторадж, но на сервере он должен игнорироваться
      localStorage.setItem(STORAGE_KEY, LanguageCode.EN);
      
      const service = TestBed.inject(LanguageService);
      
      expect(service.currentLanguage()).toBe(LanguageCode.RU);
    });

    it('should not attempt to save to localStorage when on server platform', () => {
      const service = TestBed.inject(LanguageService);
      const storageSpy = spyOn(localStorage, 'setItem');
      
      service.switchLanguage(LanguageCode.EN);
      
      expect(storageSpy).not.toHaveBeenCalled();
    });
  });
});
