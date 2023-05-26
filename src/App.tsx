import { RootRouter } from '@/router'
import { Spin } from 'antd'
import { shallowEqual, useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
// theme, intl
import { ConfigProvider, theme as antdTheme } from "antd"
import { useMemo } from "react"
import { IntlProvider } from "react-intl";
import intlMessages from '@/intl'
import { CONFIG } from "@/config"
import { ThemeType, IntlMsg, TypeLang } from "@/types"
import 'dayjs/locale/zh-cn';
import zh from "antd/lib/locale/zh_CN";
import en from "antd/lib/locale/en_US";
const antdLocal = {
  zh: zh,
  en: en
}
function App() {
  const { showGlobalLoading } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const { theme, language, primaryColor } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const themeToken = useMemo(() => {
    let color = primaryColor || CONFIG[theme as ThemeType]?.colorPrimary
    return { ...CONFIG[theme as ThemeType], colorPrimary: color }
  }, [theme, primaryColor])
  return (
    <ConfigProvider
      theme={{
        token: themeToken,
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
      }}
      locale={antdLocal[language as TypeLang]}
    >
      <IntlProvider locale={language as TypeLang} messages={(intlMessages as IntlMsg)[language as TypeLang]}>
        <Spin
          spinning={showGlobalLoading}
          tip='Loading...'
          style={{ maxHeight: 'unset', minHeight: '100vh' }}
        >
          <RootRouter />
        </Spin>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
