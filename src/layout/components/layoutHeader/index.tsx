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
    <Header className='flex-between' style={{ ...style, background: colorBgContainer }}>
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
    <TagsView tags={['magenta', 'volcano', 'red', 'magenta', 'volcano', 'red']} />
    </>
  )
}

export default LayoutHeader