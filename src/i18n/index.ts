import I18n from 'react-native-i18n';

//import language here
import vi from './locales/vi';
import en from './locales/en';

I18n.fallbacks = true;

I18n.translations = {
  en,
  vi,
};

export default I18n;
