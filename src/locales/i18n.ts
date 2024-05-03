import {initReactI18next} from 'react-i18next';

import i18n from 'i18next';

import en from '_languages/en';
import fr from '_languages/fr';
import {type TranslationsType} from '_languages/fr';

// Initialize i18n instance with different languages resources (en/fr)
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  })
  .catch(err => {
    console.log(err);
  });

/**
 * Returns the localized string defined in language files.
 * @param name the complete path to string key => Exp: actions.continue
 * @param params Custom json params if needed to inject custom data into strings.
 * @returns - Returns translated string based on name and params (from languages files)
 */
export function strings(name: TxKeyPath, params = {}): string {
  return i18n.t(name, params);
}

export const FRENCH_LANGUAGE = 'fr';
export const ENGLISH_LANGUAGE = 'en';
/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<TranslationsType>;
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];
type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];
type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
