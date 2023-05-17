import { useEffect, useState } from 'react'
import { Layout as AntdLayOut, theme, Space } from 'antd';
const { Header } = AntdLayOut;
import Fullscreen from '../fullscreen'
import SwitchLanguage from '../switchLanguage'
import UserAvatar from '../userAvatar'
import SiderTrigger from '../siderTrigger/index'
import SettingTrigger from '../setting/settingTriger'
import Breadcrumb from '../breadCrumb'
import { CONFIG, defaultTags } from '@/config'
import TagsView from '../tagsView';
import { TagType } from "@/types"
import { useNavigate, useLocation } from 'react-router-dom'

const style = {
  padding: 0,
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
}
function LayoutHeader() {
  const { token: { colorBgContainer } } = theme.useToken();
  const [ tags, setTags ] = useState<TagType[]>([...defaultTags])
  const location = useLocation()
  useEffect(() => {
    const inTags = tags.map(item => item.path).includes(location.pathname)
    if(!inTags) {
      const temp = [...tags, { path: location.pathname, label: 'menu.home', closable: true  }]
      setTags(temp)
    }
    console.log('location===', location)
  }, [location.pathname])

  return (
    <>
    <Header className='flex-between' style={{ ...style, background: colorBgContainer, boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
      <div className="header-lf flex-center">
        <Space>
          <SiderTrigger />
          <Breadcrumb />
        </Space>
      </div>
      <div className="header-rt flex-center">
        <Fullscreen />
        <SwitchLanguage />
        <UserAvatar />
        <SettingTrigger />
      </div>
    </Header>
    <div style={{
        background: colorBgContainer,
        borderBottom: '1px solid #d8dce5',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04)'
      }}
    >
      <TagsView tags={tags} />
    </div>
    
    </>
  )
}

export default LayoutHeader