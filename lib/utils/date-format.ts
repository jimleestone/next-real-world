import { format, Locale } from 'date-fns';
import us from 'date-fns/locale/en-US';
import ja from 'date-fns/locale/ja';
import { getUserLocale } from 'get-user-locale';
import { isInArray } from '../utils/check-literal';

export const supportedLocales = ['ja', 'en-US'] as const;
type LocaleType = typeof supportedLocales[number];
type LocaleFormatStyle = { locale: Locale; formatStyle: string };

const localeConfig: { [key in LocaleType]: LocaleFormatStyle } = {
  ja: { locale: ja, formatStyle: 'yyyy年MM月dd日(E)' },
  'en-US': { locale: us, formatStyle: 'PP' },
};

export default function dateFormat(date: Date | number) {
  const userLocale = getUserLocale();
  const localeFormat = isInArray(userLocale, supportedLocales)
    ? localeConfig[userLocale as LocaleType]
    : localeConfig['en-US'];

  return format(date, localeFormat.formatStyle, {
    locale: localeFormat.locale,
  });
}
