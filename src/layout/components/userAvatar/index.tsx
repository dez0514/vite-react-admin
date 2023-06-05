import { useMemo } from 'react'
import { PoweroffOutlined, GithubOutlined } from '@ant-design/icons'
import { Typography, Dropdown, Space, Avatar, theme } from 'antd'
import type { MenuProps } from 'antd'
import avatar from '@/assets/head.png'
import { CONFIG } from '@/config'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { resetLoginInfo } from '@/reducers/userReducer'
import { GlobalConfigState } from "@/types/reducer"
import { useNavigate } from 'react-router-dom'

const style = {
  padding: '0 10px',
  height: `${CONFIG.headerHeight}px`,
  cursor: 'pointer'
}

function UserAvatar() {
  const { token: { colorBgTextHover } } = theme.useToken();
  const hoverColor = useMemo(() => { // tailwindcss rgba 不能带空格，去掉空格
    return colorBgTextHover.replace(/\s+/g, '')
  }, [colorBgTextHover])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userinfo } = useSelector((store: GlobalConfigState) => store.userReducer, shallowEqual)
  const handleLogout = () => {
    sessionStorage.clear()
    dispatch(resetLoginInfo())
    navigate('/login', { replace: true })
  }
  const userDropMenu: MenuProps['items'] = [
    {
      key: '1',
      icon: <GithubOutlined />,
      label: <a target='_blank' href="https://github.com/dez0514/react-admin">项目地址</a>
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      icon: <PoweroffOutlined />,
      label: <Typography.Text onClick={handleLogout}>退出登录</Typography.Text>
    }
  ]
  return (
    <div className="UserAvatar">
      <Dropdown menu={{ items: userDropMenu }} trigger={['click']}>
        <div className={`tw-flex tw-justify-center tw-items-center hover:tw-bg-[${hoverColor}]`} style={{...style}}>
          <Space>
            <Avatar style={{display: 'block'}} src={<img src={userinfo?.avatar || avatar} alt="avatar" />} />
            <Typography.Text>{ userinfo.name }</Typography.Text>
          </Space>
        </div>
      </Dropdown>
    </div>
  )
}
export default UserAvatar