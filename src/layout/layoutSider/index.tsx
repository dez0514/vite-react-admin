import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Layout as AntdLayOut, Menu } from 'antd';
import { RouterType } from '@/types'
import { ThemeContext } from "@/providers/theme"
import { UserContext } from "@/providers/user"
import { mainRoute } from "@/router/main"
import Logo from '../logo'
import { ConfigContext } from '@/providers/config';
const { Sider } = AntdLayOut;


const formatMenu: any = (menuRoutes: RouterType[] | undefined) => {
  const menus = []
  if (!menuRoutes) {
    return null
  }
  for (const route of menuRoutes) {
    const menu = {
      label: route.label,
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

function LayoutSider() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const [memoSubKeys, setMemoSubKeys] = useState<string[]>([]);
  const [memoSelectedKeys, setMemoSelectedKeys] = useState<string[]>([]);
  const { themeType } = useContext(ThemeContext)
  const userInfo = useContext(UserContext)
  const { configStates } = useContext(ConfigContext)
  const { siderCollapse } = configStates
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
      sessionStorage.setItem('menuOpenkeys', openkeys)
    } else {
      sessionStorage.removeItem('menuOpenkeys')
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
    setCollapsed(val)
    if(!val) {
      setMenuActive()
    }
  }

  useEffect(() => {
    const menuOpenkeys = sessionStorage.getItem('menuOpenkeys')
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
      theme={themeType}
      collapsed={siderCollapse}
      onCollapse={(value) => changeCollaps(value)}
    >
      <Logo collapsed={siderCollapse} />
      <Menu
        theme={themeType}
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