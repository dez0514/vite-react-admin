import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Fragment, useState, useEffect, useContext } from 'react'
import { Layout as AntdLayOut, Menu, theme, Typography, Breadcrumb, Drawer, Avatar, Space, Dropdown } from 'antd';
import { RouterType } from '@/types'
import type { MenuProps } from 'antd';
import { ThemeContext } from "../providers/theme"
import { UserContext } from "../providers/user"
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, PoweroffOutlined, BellOutlined, SearchOutlined, TranslationOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { mainRoute } from "@/router/main"
import styled from 'styled-components'
import moduleStyles from './index.module.scss'
import Setting from '@/components/setting';
import avatar from '@/assets/head.png'
import classNames from 'classnames';
const { Header, Sider, Content } = AntdLayOut;

const TriggerBox = styled.div`
  padding: 0 15px;
  font-size: 16px;
`
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  height: 48px;
  font-size: 16px;
  text-align: center;
  img {
    display: block;
    width: 25px;
  }
`

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
  console.log('pathname===', pathname)
  const paths = pathname.match(/\w+/g)
  console.log('paths===', paths)
  if (paths === null) {
    return { selectedKeys: [''], subKeys: [] }
  } else {
    const subKeys = paths.slice(0, paths.length - 1)
    return { selectedKeys: paths, subKeys }
  }
}

function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const [memoSubKeys, setMemoSubKeys] = useState<string[]>([]);
  const [memoSelectedKeys, setMemoSelectedKeys] = useState<string[]>([]);
  const { token: { colorBgContainer } } = theme.useToken();
  const { themeType } = useContext(ThemeContext)
  const userInfo = useContext(UserContext)
  const [isOpenDrawer, setDrawerOpen] = useState(false);
  const userDropMenu: MenuProps['items'] = [
    {
      key: '1',
      icon: <PoweroffOutlined />,
      label: <Typography.Text onClick={userInfo.userLoginOut}>退出登录</Typography.Text>
    }
  ]
  const langMenu: MenuProps['items'] = [
    {
      key: '1',
      label: <Typography.Text>简体中文</Typography.Text>
    },
    {
      key: '2',
      label: <Typography.Text>English</Typography.Text>
    }
  ]
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
  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

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
    <Fragment>
      { userInfo.userCheck() === false && <Navigate to="/login" replace /> }
      <AntdLayOut>
        <Sider
          trigger={
            <TriggerBox style={{ textAlign: collapsed ? 'center' : 'right' }}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </TriggerBox>
          }
          collapsible
          theme={themeType}
          collapsed={collapsed}
          onCollapse={(value) => changeCollaps(value)}
        >
          <LogoBox style={{ justifyContent: !collapsed ? 'start' : 'center', paddingLeft: !collapsed ? '26px' : '10px' }}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="加载失败" title="logo" />
            { !collapsed ? <Typography.Text className={moduleStyles.logo_text} strong>React Admin</Typography.Text> : null }
          </LogoBox>
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
        <AntdLayOut className="site-layout">
          <Header className={moduleStyles.header_wrap} style={{ background: colorBgContainer }}>
            <div className="flex-center">
              <div className={moduleStyles.hover} onClick={() => changeCollaps(!collapsed)}>
                <TriggerBox>
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </TriggerBox>
              </div>
              <div style={{ padding: '0 10px' }}>
                <Breadcrumb
                  items={[
                    {
                      title: 'Home', 
                    },
                    {
                      title: <a href="">Application Center</a>,
                    },
                    {
                      title: <a href="">Application List</a>,
                    },
                    {
                      title: 'An Application',
                    },
                  ]}
                />
              </div>
            </div>
            <div className="flex-center">
            
              <div className={classNames(moduleStyles.setting, moduleStyles.hover)}>
                <SearchOutlined />
              </div>
              <div className={classNames(moduleStyles.setting, moduleStyles.hover)}>
                <BellOutlined />
              </div>
              <div className={classNames(moduleStyles.setting, moduleStyles.hover)}>
                <FullscreenOutlined />
                {/* <FullscreenExitOutlined /> */}
              </div>
              <Dropdown menu={{ items: langMenu }} trigger={['click']}>
                <div className={classNames(moduleStyles.setting, moduleStyles.hover)}>
                  <TranslationOutlined />
                </div>
              </Dropdown>
              <Dropdown menu={{ items: userDropMenu }} trigger={['click']}>
                <div className={classNames('flex-center', moduleStyles.userwrap, moduleStyles.hover)}>
                  <Space>
                    <Avatar src={<img src={avatar} alt="avatar" />} />
                    <Typography.Text>{ userInfo.user.name }</Typography.Text>
                  </Space>
                </div>
              </Dropdown>
              <div className={classNames(moduleStyles.setting, moduleStyles.hover)} onClick={showDrawer}>
                <SettingOutlined />
              </div>
            </div>
          </Header>
          <Content
            style={{
              padding: 20,
              height: 'calc(100vh - 48px)',
              overflow: 'hidden',
              overflowY: 'auto'
            }}
          >
            <Outlet />
          </Content>
        </AntdLayOut>
      </AntdLayOut>
      <Drawer
        title="系统设置"
        placement='right'
        closable={true}
        onClose={closeDrawer}
        open={isOpenDrawer}
      >
        <Setting />
      </Drawer>
    </Fragment>
  )
}

export default Dashboard