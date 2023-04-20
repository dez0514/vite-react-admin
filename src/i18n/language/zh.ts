import commonLanguage from "../module/common";
import menuLanguage from "../module/menu";
import login from "../module/login";
const language = "zh";
export default {
  translation: {
    // 公共
    common: commonLanguage[language],
    // 菜单
    menu: menuLanguage[language],
    login: login[language]
  }
};