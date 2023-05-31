import * as i18n from "i18n";
import * as path from "path";

i18n.configure({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "../lang"),
  defaultLocale: "en",
  header: "accept-language",
  objectNotation: true,
  updateFiles: false,
});

export default i18n;
