import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import resourcesToBackend from "i18next-resources-to-backend";
import Cookies from "js-cookie";

i18n
    .use(initReactI18next)
    .use(resourcesToBackend((lang, ns) => import((`./public/locales/${lang}/${ns}.json`))))
    .init({
        lng: Cookies.get('lng') ?? 'tr',
        fallbackLng: Cookies.get('lng') ?? 'tr',
        load: 'all',
        ns: ['common', 'faq', 'footer', 'forms', 'menu', 'privacy', 'terms'],
        defaultNS: 'common',
    })

export default i18n;
