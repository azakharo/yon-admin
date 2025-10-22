export enum SupportedLanguage {
  English = 'English',
  Portugal = 'Portugal',
  Mexico = 'Mexico',
  Brazil = 'Brazil',
}

export type TranslationDict = Record<SupportedLanguage, string>;
