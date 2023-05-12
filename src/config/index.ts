import { ConfigData } from "../types"

// 初始默认值
export const CONFIG: ConfigData = {
  headerHeight: 48,
  siderWidth: 220,
  language: 'zh',
  theme: 'dark',
  // antd 组件换主题时 配色
  light: {},
  dark: {
    colorPrimary: '#1677ff'
    // colorBgBase: "#141414",
    // colorTextBase: "#fff"
  }
}

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
