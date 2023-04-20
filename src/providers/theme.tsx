import { ConfigProvider, theme as antdTheme } from "antd"
import { ThemeConfig } from "antd/es/config-provider/context"
import { createContext, useState, useEffect } from "react"
import { THEME } from "../config"
import { ContextProps, Theme, ThemeType } from "../types"
// import i18n from '@/i18n'
import zh from "antd/lib/locale/zh_CN";
import en from "antd/lib/locale/en_US";

const originalSetItem = sessionStorage.setItem;
sessionStorage.setItem = function (key, newValue) {
  const setItemEvent: any = new Event("setItemEvent");
  setItemEvent[key] = newValue;
  window.dispatchEvent(setItemEvent);
  originalSetItem.apply(this, [key, newValue]);
};

export const ThemeContext = createContext<{
  themeType: ThemeType
  updateThemeType: any
  setThemeToken: any
}>({ themeType: "light", updateThemeType: () => {}, setThemeToken: () => {} })

export function ThemeProvider(props: ContextProps) {
  const [themeType, setThemeType] = useState<ThemeType>("light")
  const [themeToken, setThemeToken] = useState<ThemeConfig["token"]>(THEME.light)
  const [locale, setLocale] = useState(sessionStorage.getItem("langType"));

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
      e?.langType && setLocale(e.langType);
      location.reload()
    };
    window.addEventListener("setItemEvent", getLangType);
    return () => {
      window.removeEventListener("setItemEvent", getLangType);
    };
  }, []);
  useEffect(() => {
    console.log('locale===', locale)
  }, [locale])

  return (
    <ThemeContext.Provider
      value={{ themeType, updateThemeType, setThemeToken }}>
      <ConfigProvider 
        theme={{
          token: themeToken,
          algorithm: themeType === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm 
        }}
        locale={ locale === "en" ? en : zh }
      >
        {props.children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
