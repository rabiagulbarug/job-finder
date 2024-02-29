const { withTranslation } = require('next-i18next');

const path = require("path");
const Cookies = require("js-cookie");

module.exports = withTranslation({
  i18n: {
    defaultLocale: Cookies.get('lng'),
    locales: ['en', 'tr',],
  },
  localePath: path.resolve('./public/locales'),
});
