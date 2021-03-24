import fsBackend from 'i18next-node-fs-backend'
import i18next from 'i18next'
import i18nextMiddleware from "i18next-express-middleware"

i18next
  .use(fsBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'ru',
    preload: ['en', 'ru'],
    saveMissing: true
  });

export default i18next