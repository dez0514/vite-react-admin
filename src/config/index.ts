import { ConfigData } from "../types"

// 初始默认值
export const CONFIG: ConfigData = {
  nofixedHeader: false,
  navType: 'lt',
  hideLogo: false,
  hideTagsView: false,
  headerHeight: 48,
  siderWidth: 220,
  language: 'zh',
  theme: 'light',
  // antd 组件换主题时 配色
  light: {
    colorPrimary: '#1677ff'
  },
  dark: {
    colorPrimary: '#1DB313'
    // colorBgBase: "#141414",
    // colorTextBase: "#fff"
  }
}

export const presetColors = ['#1677ff', '#304156', '#212121', '#11A983', '#13C2C2', '#6959CD', '#F5222D']
