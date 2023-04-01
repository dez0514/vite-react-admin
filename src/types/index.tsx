import { ReactNode } from "react"
import { ThemeConfig } from "antd/es/config-provider/context"

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
  label?: string
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

export enum StorageKeys {
  USERINFO = "userinfo",
}

export type ConfigData = {
  headerHeight: number
}
