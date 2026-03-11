export enum LanguageCode {
  RU = 'ru',
  EN = 'en'
}

export interface Language {
  code: LanguageCode;
  icon: string;
}

export const AVAILABLE_LANGUAGES: Language[] = [
  { 
    code: LanguageCode.RU, 
    icon: '/image/flag_ru.svg', 
  },
  { 
    code: LanguageCode.EN, 
    icon: '/image/flag_en.svg', 
  }
];