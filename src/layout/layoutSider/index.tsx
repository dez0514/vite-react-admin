import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Layout as AntdLayOut, Menu } from 'antd';
import { RouterType } from '@/types'
import { UserContext } from "@/providers/user"
import { mainRoute } from "@/router/main"
import Logo from '../logo'
import { shallowEqual, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { GlobalConfigState } from '@/types/reducer'
import { StorageKeys } from '@/types/enum';
import { CSSProperties } from "react"
const { Sider } = AntdLayOut;


const formatMenu: any = (menuRoutes: RouterType[] | undefined) => {
  const menus = []
  if (!menuRoutes) {
    return null
  }
  for (const route of menuRoutes) {
    const menu = {
      label: <FormattedMessage id={route.label} />,
      key: route.path,
      icon: route.icon,
      children: formatMenu(route.children),
    }
    if (!route.hide) {
      menus.push(menu)
    }
  }
  return menus
}
const pathnameToSelectedKeys = (pathname: string) => {
  const paths = pathname.match(/\w+/g)
  console.log('paths===', paths)
  if (paths === null) {
    return { selectedKeys: [''], subKeys: [] }
  } else {
    const subKeys = paths.slice(0, paths.length - 1)
    return { selectedKeys: paths, subKeys }
  }
}

function LayoutSider(props: {
  style?: CSSProperties
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, siderCollapse } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const [memoSubKeys, setMemoSubKeys] = useState<string[]>([]);
  const [memoSelectedKeys, setMemoSelectedKeys] = useState<string[]>([]);
  const userInfo = useContext(UserContext)
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
    const openkeys = openKeys.filter(Boolean).join('-')
    if(openkeys) {
      sessionStorage.setItem(StorageKeys.menuOpenkeys, openkeys)
    } else {
      sessionStorage.removeItem(StorageKeys.menuOpenkeys)
    }
  }
  const setMenuActive = () => {
    const selectedKeys = pathnameToSelectedKeys(location.pathname).selectedKeys
    setMemoSelectedKeys(selectedKeys)
    // 处理展开的菜单
    const subkeys = pathnameToSelectedKeys(location.pathname).subKeys
    if(subkeys.length > 0) {
      const newSubArr = Array.from(new Set(memoSubKeys.concat(subkeys))) // 合并去重
      setMenuOpen(newSubArr)
    }
  }
  const changeCollaps = (val: boolean) => {
    if(!val) {
      setMenuActive()
    }
  }

  useEffect(() => {
    const menuOpenkeys = sessionStorage.getItem(StorageKeys.menuOpenkeys)
    if(menuOpenkeys) {
      const openArr = menuOpenkeys.split('-').filter(Boolean)
      setMenuOpen(openArr)
    }
  }, [])

  useEffect(() => {
    setMenuActive()
  }, [location])

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])
  
  return (
    <Sider
      trigger={null}
      collapsible
      theme={theme}
      collapsed={siderCollapse}
      onCollapse={(value) => changeCollaps(value)}
      style={{ ...props.style }}
    >
      <Logo collapsed={siderCollapse} />
      <Menu
        theme={theme}
        mode="inline"
        openKeys={memoSubKeys}
        selectedKeys={memoSelectedKeys}
        items={formatMenu(mainRoute.children)}
        onSelect={(menu) => {
          const path = formatPath(menu.keyPath)
          navigate(path)
        }}
        onOpenChange={(openKeys) => {
          setMenuOpen(openKeys)
        }}
      />
    </Sider>
  )
}

export default LayoutSider