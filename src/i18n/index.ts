import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./resources";

export function initI18n(lang: "en" | "zh") {
  // 初始化 i18n
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: resources.en,
      },
      zh: {
        translation: resources.zh,
      },
      ja: {
        translation: resources.ja,
      }
    },
    lng: lang, // 设置默认语言
    fallbackLng: "en", // 如果没有对应的语言文件，则使用默认语言
    interpolation: {
      escapeValue: false, // 不进行 HTML 转义
    },
  });
}