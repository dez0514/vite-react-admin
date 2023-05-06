import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { CONFIG } from '@/config'
const { Content } = Layout

const LayoutContent = () => {
  return (
    <Content
      style={{
        overflow: 'hidden',
        overflowY: 'auto',
        flex: 1
      }}
    >
      <Outlet />
    </Content>
  )
}
export default LayoutContent