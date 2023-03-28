import { Layout as AntdLayOut, theme } from 'antd';
const { Header } = AntdLayOut;
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import UserAvatar from './components/userAvatar'
import SiderTrigger from '../siderTrigger/index'
import SettingTrigger from '../setting/settingTriger'
import Breadcrumb from './components/breadcrumb'

const style = {
  padding: 0,
  height: '48px',
  lineHeight: 1
}
function LayoutHeader() {
  const { token: { colorBgContainer } } = theme.useToken();
  return (
    <Header className='flex-between' style={{ ...style, background: colorBgContainer }}>
      <div className="flex-center">
        <SiderTrigger />
        <div style={{ padding: '0 10px' }}>
          <Breadcrumb />
        </div>
      </div>
      <div className="flex-center">
        <Fullscreen />
        <Language />
        <UserAvatar />
        <SettingTrigger />
      </div>
    </Header>
  )
}

export default LayoutHeader