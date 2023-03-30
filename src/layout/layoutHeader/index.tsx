import { Layout as AntdLayOut, theme, Space } from 'antd';
const { Header } = AntdLayOut;
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import UserAvatar from './components/userAvatar'
import SiderTrigger from '../siderTrigger/index'
import SettingTrigger from '../setting/settingTriger'
import Breadcrumb from './components/breadcrumb'
import { CONFIG } from '@/config'

const style = {
  padding: 0,
  height: `${CONFIG.headerHeight}px`,
  lineHeight: `${CONFIG.headerHeight}px`,
}
function LayoutHeader() {
  const { token: { colorBgContainer } } = theme.useToken();
  return (
    <Header className='flex-between' style={{ ...style, background: colorBgContainer }}>
      <div className="header-lf flex-center">
        <Space>
          <SiderTrigger />
          <Breadcrumb />
        </Space>
      </div>
      <div className="header-rt flex-center">
        <Fullscreen />
        <Language />
        <UserAvatar />
        <SettingTrigger />
      </div>
    </Header>
  )
}

export default LayoutHeader