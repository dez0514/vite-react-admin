import { TypeLang, ThemeType } from './index'

export type configState = {
  openSettingDrawer?: boolean
  siderCollapse?: boolean
  language?: TypeLang
  theme?: ThemeType
  primaryColor?: string
  hideLogo?: boolean
}

export type GlobalConfigState = {
  globalConfig: configState
}

export type configAction = {
  type: string,
  payload: configState
}

export type ConfigReducerType = React.Reducer<configState, configAction>