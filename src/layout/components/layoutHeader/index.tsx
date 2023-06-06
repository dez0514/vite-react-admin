import { useEffect, useState } from 'react'
import { Layout as AntdLayOut, theme, Space } from 'antd';
const { Header } = AntdLayOut;
import Fullscreen from '../fullscreen'
import SwitchLanguage from '../switchLanguage'
import UserAvatar from '../userAvatar'
import SiderTrigger from '../siderTrigger/index'
import SettingTrigger from '../setting/settingTriger'
import LayoutSider from '../layoutSider';
import Logo from '../logo';
import Breadcrumb from '../breadCrumb'
import { CONFIG } from '@/config'
import TagsView from '../tagsView';
import { TagType, RouterType } from "@/types"
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { mainRoute } from '@/router/main'
import { flatRouteTree } from '@/utils'
import { FormattedMessage } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'

const style = {
  padding: 0,
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
}
function LayoutHeader({ hasSider = false, noLogo = false } : { hasSider?: boolean, noLogo?: boolean }) {
  const { hideTagsView, hideLogo } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const { userinfo } = useSelector((state: GlobalConfigState) => state.userReducer, shallowEqual)
  const navigate = useNavigate()
  const location = useLocation()
  const homeTag: TagType = {
    path: '/dashboard', // location 拿到的是 '/'
    label: <FormattedMessage id='menu.home' />,
    closable: false
  }
  const MenuData: RouterType[] = flatRouteTree(mainRoute || []).filter((item: any) => item.path).map((item: any) => {
    return {
      ...item,
      path: item.path,
      fullPath: item.fullPath,
      label: <FormattedMessage id={`${item.label}`} />
    }
  })
  const { token: { colorBgContainer, colorBorder, boxShadow } } = theme.useToken();
  const [ tags, setTags ] = useState<TagType[]>([homeTag])
  const handleTagClose = (closeTag: TagType) => {
    const temp = tags.filter(item => item.path !== closeTag.path)
    if(closeTag.path === location.pathname) {
      const path = temp[temp.length - 1].path
      navigate(path)
    }
    setTags(temp)
  }
  useEffect(() => {
    if(location.pathname !== homeTag.path) {
      const inTags = tags.map(item => item.path).includes(location.pathname)
      if(!inTags) {
        let label: string | ReactNode = ''
        const fitem = MenuData.find(item => item.fullPath === location.pathname)
        if(fitem && fitem.label) {
          if(userinfo.role === 'admin' || !fitem.roles || fitem.roles!.includes(userinfo.role)) {
            label = fitem.label
            const temp = [...tags, { path: location.pathname, label, closable: true  }]
            setTags(temp)
          }
        }
      }
    }
    // console.log('location===', location)
  }, [location.pathname])

  return (
    <>
      <Header className='tw-overflow-hidden tw-w-[100%] tw-flex tw-justify-between tw-items-center' style={{ ...style, background: colorBgContainer,borderBottom: `1px solid ${colorBorder}`, boxShadow: boxShadow }}>
        {
          !hasSider && (<div className="header-lf tw-flex tw-justify-center tw-items-center tw-flex-shrink-0">
            <Space>
              { !hideLogo && !noLogo && <Logo style={{ width: `${CONFIG.siderWidth}px` }} /> }
              <SiderTrigger />
              <Breadcrumb />
            </Space>
          </div>)
        }
        { hasSider && !hideLogo && !noLogo && <Logo /> }
        {
          hasSider && (<div className='tw-overflow-hidden tw-flex-1'>
            <LayoutSider mode={'horizontal'} noLogo={true} />
          </div>)
        }
        <div className="header-rt tw-flex tw-justify-center tw-items-center tw-flex-shrink-0">
          <Fullscreen />
          <SwitchLanguage />
          <UserAvatar />
          <SettingTrigger />
        </div>
      </Header>
      {
        !hideTagsView &&
        (
          <div
            style={{
              background: colorBgContainer,
              borderBottom: `1px solid ${colorBorder}`,
              boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px'
            }}
          >
            <TagsView tags={tags} onClose={handleTagClose} />
          </div>
        )
      }
    </>
  )
}

export default LayoutHeader