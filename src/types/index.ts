import { ReactNode } from "react"
import { ThemeConfig } from "antd/es/config-provider/context"

export type ThemeType = 'light' | 'dark'
export type TypeLang = 'en' | 'zh'

export interface ContextProps {
  children?: ReactNode
}
export interface IntlMsg {
  [key: string]: any
}

export type UserType = {
  name?: string
  token?: string
}

export type ConfigData = {
  headerHeight: number
  siderWidth: number
  language: TypeLang
  theme: ThemeType
  light: ThemeConfig["token"]
  dark: ThemeConfig["token"],
  algorithmLight?: ThemeConfig["algorithm"],
  algorithmDark?: ThemeConfig["algorithm"]
}

export type RouterType = {
  // route props
  path?: string
  element?: ReactNode
  children?: RouterType[]
  loader?: () => void
  // menu props
  icon?: ReactNode
  name?: string
  label?: string  // | ReactNode
  hide?: boolean
  // auth props
  // auth?: Roles[]
}

export type MenuType = {
  label: string
  key: string
  icon: ReactNode
  children: MenuType[]
}

