import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';
import { LanguageCode } from './models/language.model';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';

describe('LanguageService', () => {
  let translate: TranslateService;
  const STORAGE_KEY = 'user_lang';

  function setup() {
    // Сервис инджектим ПОСЛЕ spy — явный порядок
    translate = TestBed.inject(TranslateService);
    spyOn(translate, 'use').and.returnValue(of({}));
    return TestBed.inject(LanguageService);
  }

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        LanguageService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
  });

  it('should initialize with RU when storage is empty', () => {
    const service = setup();

    expect(service.currentLanguage()).toBe(LanguageCode.RU);
    expect(translate.use).toHaveBeenCalledOnceWith(LanguageCode.RU);
  });

  it('should switch language, update signal and save to localStorage', () => {
    const service = setup();
    (translate.use as jasmine.Spy).calls.reset();

    service.switchLanguage(LanguageCode.EN);

    expect(service.currentLanguage()).toBe(LanguageCode.EN);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(LanguageCode.EN);
    expect(translate.use).toHaveBeenCalledOnceWith(LanguageCode.EN);
  });

  it('should read language from localStorage on startup', () => {
    localStorage.setItem(STORAGE_KEY, LanguageCode.EN);
    const service = setup();

    expect(service.currentLanguage()).toBe(LanguageCode.EN);
    expect(translate.use).toHaveBeenCalledOnceWith(LanguageCode.EN);
  });

  it('should fallback to RU if localStorage has invalid value', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid_lang' as any);
    const service = setup();

    expect(service.currentLanguage()).toBe(LanguageCode.RU);
    // ✅ Добавлена проверка translate.use
    expect(translate.use).toHaveBeenCalledOnceWith(LanguageCode.RU);
  });

  describe('Server Side Environment', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideTranslateService(),
          LanguageService,
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });
    });

    it('should always initialize with RU on server, ignoring localStorage', () => {
      // localStorage здесь доступен только потому что это jsdom-среда,
      // в реальном SSR его нет — тест проверяет логику isPlatformBrowser
      localStorage.setItem(STORAGE_KEY, LanguageCode.EN);
      const service = setup();

      expect(service.currentLanguage()).toBe(LanguageCode.RU);
      expect(translate.use).toHaveBeenCalledOnceWith(LanguageCode.RU);
    });

    it('should switch language signal without saving to localStorage on server', () => {
      const service = setup();
      const storageSpy = spyOn(localStorage, 'setItem');
      (translate.use as jasmine.Spy).calls.reset();

      service.switchLanguage(LanguageCode.EN);

      // ✅ Язык всё же переключается
      expect(service.currentLanguage()).toBe(LanguageCode.EN);
      expect(translate.use).toHaveBeenCalledOnceWith(LanguageCode.EN);
      // ✅ Но localStorage не трогается
      expect(storageSpy).not.toHaveBeenCalled();
    });
  });
});