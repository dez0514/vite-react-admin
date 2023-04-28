import { ConfigProvider, theme as antdTheme } from "antd"
import { ThemeConfig } from "antd/es/config-provider/context"
import { createContext, useState, useEffect } from "react"
import { THEME } from "../config"
import { ContextProps, Theme, ThemeType, IntlMsg } from "../types"
import 'dayjs/locale/zh-cn';
import zh from "antd/lib/locale/zh_CN";
import en from "antd/lib/locale/en_US";
import { IntlProvider } from "react-intl";
import intlMessages from '@/intl' 
import { CONFIG } from '@/config'
// import En from '@/i18n/language/en'
// import Zh from '@/i18n/language/zh'

export const ThemeContext = createContext<{
  themeType: ThemeType
  updateThemeType: any
  setThemeToken: any
}>({ themeType: 'light', updateThemeType: () => {}, setThemeToken: () => {} })
export function ThemeProvider(props: ContextProps) {
  const [themeType, setThemeType] = useState<ThemeType>("light")
  const [themeToken, setThemeToken] = useState<ThemeConfig["token"]>(THEME.light)
  const [locale, setLocale] = useState(sessionStorage.getItem("langType") || CONFIG.defaultLanguage);
 
  const updateThemeType = (themeType: Theme) => {
    setThemeType(themeType)
    window.document.documentElement.setAttribute('data-theme', themeType)
    if (themeType === Theme.dark) {
      setThemeToken(THEME.dark)
    } else {
      setThemeToken(THEME.light)
    }
  }

  useEffect(() => {
    const getLangType = (e: any) => {
      e?.langType && setLocale(e.langType || CONFIG.defaultLanguage);
      console.log('lang===============', e)
    };
    window.addEventListener("setItemEvent", getLangType);
    return () => {
      window.removeEventListener("setItemEvent", getLangType);
    };
  }, []);
  return (
    <ThemeContext.Provider
      value={{ themeType, updateThemeType, setThemeToken }}>
      <ConfigProvider 
        theme={{
          token: themeToken,
          algorithm: themeType === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm 
        }}
        locale={ locale === 'en' ? en : zh }
      >
        <IntlProvider locale={ locale } messages={ (intlMessages as IntlMsg)[locale] }>
          {props.children}
        </IntlProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
