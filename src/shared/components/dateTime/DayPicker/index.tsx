import {FC} from 'react';
import {
  DayPicker as OriginalDayPicker,
  DayPickerProps,
  Locale,
} from 'react-day-picker';
import {enUS, es, pt, ptBR, ru} from 'react-day-picker/locale';

import 'react-day-picker/style.css';
import styles from './styles.module.scss';
// import classNames from 'react-day-picker/style.module.css'; // Output the class names as parsed by CSS modules.

// console.log(classNames);

const mapLanguageToLocale = (lang: string): Locale => {
  const normalizedLang = lang.toLowerCase();

  // TODO don't hard-code the list of supported locales
  if (normalizedLang.startsWith('es')) {
    return es;
  } else if (normalizedLang === 'pt-br') {
    return ptBR;
  } else if (normalizedLang.startsWith('pt')) {
    return pt;
  } else if (normalizedLang.startsWith('ru')) {
    return ru;
  } else {
    return enUS;
  }
};

export const DayPicker: FC<DayPickerProps> = props => {
  return (
    <OriginalDayPicker
      animate
      locale={mapLanguageToLocale(navigator.language)}
      showOutsideDays
      classNames={{
        day: styles.day,
        selected: props.mode === 'range' ? undefined : styles.selected,
        outside: styles.outside,
        weekday: styles.weekday,
      }}
      {...props}
    />
  );
};
