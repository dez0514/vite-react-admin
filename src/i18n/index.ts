import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import resources from "./resources"
console.log('navigator==', navigator)
const langType: string = sessionStorage.getItem("langType") || ''
i18n
  .use(LanguageDetector)  // 获取浏览器默认的语言（浏览器默认通常是en）
  .use(initReactI18next).init({
    resources,
    interpolation: {
      escapeValue: false,
    },
    lng: langType,
    debug: false,
    // fallbackLng: "zh", //默认当前环境的语言
    fallbackLng: ["zh", "en", "dev"],
    detection: {
      lookupSessionStorage: "langType",
      caches: ["sessionStorage"],
      order: ["sessionStorage"],
      lookupQuerystring: "lng"
    }
  })

export default i18n