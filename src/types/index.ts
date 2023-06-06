import { ReactNode } from "react"
import { ThemeConfig } from "antd/es/config-provider/context"
import { LoaderFunction } from 'react-router-dom'

export type ThemeType = 'light' | 'dark'
export type TypeLang = 'en' | 'zh'
// 布局方式 左-右上,上-下左,上-下
export type TypeNav = 'lt' | 'tl' | 't'
export type MenuModeType = 'horizontal' | 'vertical' | 'inline'

export interface ContextProps {
  children?: ReactNode
}
export interface IntlMsg {
  [key: string]: any
}

export type UserType = {
  name?: string
  token?: string
  avatar?: string
  description?: string
  id?: string
  role?: string
}

export type ConfigData = {
  nofixedHeader: boolean
  navType: TypeNav
  hideLogo: boolean
  hideTagsView: boolean
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
  element?: any
  children?: RouterType[]
  loader?: LoaderFunction
  id?: string
  // menu props
  icon?: ReactNode
  name?: string
  label?: string | ReactNode
  hide?: boolean
  // auth props
  roles?: string[]
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