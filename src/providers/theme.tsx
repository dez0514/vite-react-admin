import { ConfigProvider, theme as antdTheme } from "antd"
import { useMemo } from "react"
import { IntlProvider } from "react-intl";
import intlMessages from '@/intl'
import { shallowEqual, useSelector } from "react-redux";
import { CONFIG } from "@/config"
import { GlobalConfigState } from '@/types/reducer'
import { ContextProps, ThemeType, IntlMsg, TypeLang } from "@/types"

import 'dayjs/locale/zh-cn';
import zh from "antd/lib/locale/zh_CN";
import en from "antd/lib/locale/en_US";
const antdLocal = {
  zh: zh,
  en: en
}

export function ThemeProvider(props: ContextProps) {
  const { theme, language } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const themeToken = useMemo(() => {
    return CONFIG[theme as ThemeType]
  }, [theme])

  return (
    <ConfigProvider
      theme={{
        token: themeToken,
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
      }}
      locale={antdLocal[language as TypeLang]}
    >
      <IntlProvider locale={language as TypeLang} messages={(intlMessages as IntlMsg)[language as TypeLang]}>
        {props.children}
      </IntlProvider>
    </ConfigProvider>
  )
}
