import { Layout as AntdLayOut, theme, Space } from 'antd';
const { Header } = AntdLayOut;
import Fullscreen from '../fullscreen'
import SwitchLanguage from '../switchLanguage'
import UserAvatar from '../userAvatar'
import SiderTrigger from '../siderTrigger/index'
import SettingTrigger from '../setting/settingTriger'
import Breadcrumb from '../breadCrumb'
import { CONFIG } from '@/config'
import TagsView from '../tagsView';

const style = {
  padding: 0,
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
}
function LayoutHeader() {
  const { token: { colorBgContainer } } = theme.useToken();
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
    <div style={{ background: colorBgContainer, borderBottom: '1px solid #d8dce5',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04)' }}>
      <TagsView tags={['magenta', 'volcano', 'red', 'magenta', 'volcano', 'red']} />
    </div>
    
    </>
  )
}

export default LayoutHeader