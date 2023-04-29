import { useContext } from 'react'
import { UserContext } from "@/providers/user"
import { PoweroffOutlined } from '@ant-design/icons'
import { Typography, Dropdown, Space, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import avatar from '@/assets/head.png'
import { CONFIG } from '@/config'

const style = {
  padding: '0 10px',
  height: `${CONFIG.headerHeight}px`,
  cursor: 'pointer'
}

function UserAvatar() {
  const userInfo = useContext(UserContext)
  const userDropMenu: MenuProps['items'] = [
    {
      key: '1',
      icon: <PoweroffOutlined />,
      label: <Typography.Text onClick={userInfo.userLoginOut}>退出登录</Typography.Text>
    }
  ]
  return (
    <div className="UserAvatar">
      <Dropdown menu={{ items: userDropMenu }} trigger={['click']}>
        <div className='flex-center custom_btn_hover' style={{...style}}>
          <Space>
            <Avatar src={<img src={avatar} alt="avatar" />} />
            <Typography.Text>{ userInfo.user.name }</Typography.Text>
          </Space>
        </div>
      </Dropdown>
    </div>
  )
}
export default UserAvatar