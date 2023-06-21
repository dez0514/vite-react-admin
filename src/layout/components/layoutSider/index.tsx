import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Layout as AntdLayOut, Menu } from 'antd';
import { RouterType, MenuModeType } from '@/types'
import { mainRoute } from "@/router/main"
import Logo from '../logo'
import { shallowEqual, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { GlobalConfigState } from '@/types/reducer'
import { StorageKeys } from '@/types/enum';
import { CSSProperties } from "react"
import { CONFIG } from '@/config'
const { Sider } = AntdLayOut;


const formatMenu: any = (menuRoutes: RouterType[] | undefined, role: string) => {
  const menus = []
  if (!menuRoutes) {
    return null
  }
  for (const route of menuRoutes) {
    const menu = {
      ...route,
      label: <FormattedMessage id={`${route.label}`} />,
      key: route.path,
      icon: route.icon,
      children: formatMenu(route.children, role)
    }
    if (!route.hide) {
      if(role === 'admin' || !route.roles || route.roles!.includes(role)) {
        menus.push(menu)
      }
    }
  }
  // 子路由都被隐藏时 父级也过滤掉
  return menus.filter(item => !item.children || item.children.length !== 0)
}
const pathnameToSelectedKeys = (pathname: string) => {
  const paths = pathname.match(/\w+/g)
  console.log('paths===', paths)
  if (paths === null) {
    return { selectedKeys: ['dashboard'], subKeys: [] }
  } else {
    const subKeys = paths.slice(0, paths.length - 1)
    return { selectedKeys: paths, subKeys }
  }
}

const isURL = (str: string) => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}
interface Props {
  style?: CSSProperties,
  mode?: MenuModeType,
  noLogo?: boolean,
  subtractTagsHeight?: boolean // 减掉 tagsview 的高度
}
function LayoutSider({ style = {}, mode = 'inline', noLogo = false, subtractTagsHeight = false } : Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, siderCollapse, hideLogo, hideTagsView } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const { userinfo } = useSelector((state: GlobalConfigState) => state.userReducer, shallowEqual)
  const [memoSubKeys, setMemoSubKeys] = useState<string[]>([]);
  const [memoSelectedKeys, setMemoSelectedKeys] = useState<string[]>([]);
  const formatPath = (pathArray: string[]) => {
    pathArray.reverse()
    return pathArray.reduce((path, cur, index) => {
      if (index === 0) {
        return path + cur
      } else {
        return path + '/' + cur
      }
    }, '/')
  }
  const setMenuOpen = (openKeys: string[]) => {
    setMemoSubKeys(openKeys)
    if(mode !== 'horizontal') {
      const openkeys = openKeys.filter(Boolean).join('-')
      if(openkeys) {
        sessionStorage.setItem(StorageKeys.menuOpenkeys, openkeys)
      } else {
        sessionStorage.removeItem(StorageKeys.menuOpenkeys)
      }
    }
  }
  const setMenuActive = () => {
    const selectedKeys = pathnameToSelectedKeys(location.pathname).selectedKeys
    setMemoSelectedKeys(selectedKeys)
    // 处理展开的菜单
    if(mode !== 'horizontal') {
      const subkeys = pathnameToSelectedKeys(location.pathname).subKeys
      if(subkeys.length > 0) {
        const newSubArr = Array.from(new Set(memoSubKeys.concat(subkeys))) // 合并去重
        setMenuOpen(newSubArr)
      }
    }
  }
  const changeCollaps = (val: boolean) => {
    if(!val) {
      setMenuActive()
    }
  }

  useEffect(() => {
    if(mode !== 'horizontal') {
      const menuOpenkeys = sessionStorage.getItem(StorageKeys.menuOpenkeys)
      if(menuOpenkeys) {
        const openArr = menuOpenkeys.split('-').filter(Boolean)
        setMenuOpen(openArr)
      }
    }
  }, [])

  useEffect(() => {
    setMenuActive()
  }, [location])
  const initMenu = () => {
    return (
      <Menu
        theme={theme}
        mode={mode}
        style={{ 
          borderInlineEnd: 'none',
          overflow: 'hidden',
          overflowY: mode === 'horizontal' ? 'hidden': 'auto',
          height: mode === 'horizontal' ? `${CONFIG.headerHeight}px` : 
          subtractTagsHeight ? `calc(100vh - ${ hideLogo ? 0 : CONFIG.headerHeight }px - ${ hideTagsView ? 0 : 41 }px)` :
          `calc(100vh - ${ hideLogo ? 0 : CONFIG.headerHeight }px)`
        }}
        openKeys={memoSubKeys}
        selectedKeys={memoSelectedKeys}
        items={formatMenu(mainRoute, userinfo.role)}
        onSelect={({ keyPath, key }) => {
          if(!isURL(key)) {
            const path = formatPath(keyPath)
            navigate(path)
          } else {
            window.open(key)
          }
        }}
        onOpenChange={(openKeys) => {
          setMenuOpen(openKeys)
        }}
      />
    )
  }
  if(mode === 'horizontal') {
    return initMenu()
  }
  return (
    <Sider
      trigger={null}
      collapsible
      theme={theme}
      collapsed={siderCollapse}
      onCollapse={(value) => changeCollaps(value)}
      style={{ ...style }}
      width={CONFIG.siderWidth}
    >
      { !hideLogo && !noLogo && <Logo collapsed={siderCollapse} /> }
      { initMenu() }
    </Sider>
  )
}

export default LayoutSider