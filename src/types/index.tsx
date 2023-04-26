import { ReactNode } from "react"
import { ThemeConfig } from "antd/es/config-provider/context"
import { type } from "os"

export type ThemeType = 'light' | 'dark'

export interface ThemeData {
  light?: ThemeConfig["token"]
  dark?: ThemeConfig["token"],
  algorithmLight?: ThemeConfig["algorithm"],
  algorithmDark?: ThemeConfig["algorithm"]
}

export enum Theme {
  light = "light",
  dark = "dark"
}

export interface ContextProps {
  children?: ReactNode
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
  label?: string | ReactNode
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

export type UserType = {
  name?: string
  token?: string
}

export type LangType = 'en' | 'zh'

export enum StorageKeys {
  USERINFO = "userinfo",
}

export type ConfigData = {
  headerHeight: number
}
