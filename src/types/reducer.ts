import { TypeLang, ThemeType, TypeNav } from './index'

export type configState = {
  nofixedHeader?: boolean
  navType?: TypeNav
  showGlobalLoading?: boolean 
  openSettingDrawer?: boolean
  siderCollapse?: boolean
  language?: TypeLang
  theme?: ThemeType
  primaryColor?: string
  hideLogo?: boolean
  hideTagsView?: boolean
}

export type GlobalConfigState = {
  globalConfig: configState,
  userReducer: any
}

export type configAction = {
  type: string,
  payload: configState
}

export type ConfigReducerType = React.Reducer<configState, configAction>