import {SupportedLanguage, TranslationDict} from '../types';

export const createEmptyTranslationDict = () => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.values(SupportedLanguage).reduce((accum, lang) => {
    accum[lang] = '';
    return accum;
  }, {} as TranslationDict);
};
