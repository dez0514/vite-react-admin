import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { CONFIG } from '@/config'
const { Content } = Layout

const LayoutContent = () => {
  return (
    <Content
      style={{
        height: `calc(100vh - ${CONFIG.headerHeight}px - 41px)`,
        overflow: 'hidden',
        overflowY: 'auto'
      }}
    >
      <Outlet />
    </Content>
  )
}
export default LayoutContent