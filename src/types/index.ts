import { ReactNode } from "react"
import { ThemeConfig } from "antd/es/config-provider/context"
import { LoaderFunction } from 'react-router-dom'

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
  hideLogo: boolean
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
  fullPath?: string
  element?: ReactNode
  children?: RouterType[]
  loader?: LoaderFunction
  id?: string
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

export type TagType = {
  path: string
  label: string | ReactNode
  closable: boolean
}
