import { ConfigData } from "../types"

// 初始默认值
export const CONFIG: ConfigData = {
  headerHeight: 48,
  siderWidth: 220,
  language: 'zh',
  theme: 'dark',
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

export const guideSteps = [
  {
    element: "#sider-trigger",
    popover: {
      title: "演示标题1",
      description: "这是详细描述\n",
      position: "bottom-center",
    },
  },
  {
    element: "#fullscreen",
    popover: {
      title: "演示标题2",
      description: "这是详细描述\n",
      position: "bottom-center",
    },
  }
]
