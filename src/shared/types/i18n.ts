// The values are backend specific
export enum SupportedLanguage {
  English = 'en',
  Portugal = 'pt',
  Tagalog = 'tl',
  Filipino = 'fil',
  Spanish = 'es',
  Russian = 'ru',
}

export type TranslationDict = Record<SupportedLanguage, string>;
