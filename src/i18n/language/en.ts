import componentLanguage from "../module/components";
import menuLanguage from "../module/menu";
const language = "en";
export default {
    translation: {
        // 公共组件
        components: componentLanguage[language],
        // 菜单
        menu: menuLanguage[language]
    }
};