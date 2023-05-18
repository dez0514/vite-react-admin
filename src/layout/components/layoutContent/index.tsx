import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { CONFIG } from '@/config'
import { shallowEqual, useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
const { Content } = Layout

const LayoutContent = () => {
  const { hideTagsView } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  return (
    <Content
      style={{
        height: `calc(100vh - ${CONFIG.headerHeight}px - ${hideTagsView ? 0 : 41}px)`,
        overflow: 'hidden',
        overflowY: 'auto'
      }}
    >
      <Outlet />
    </Content>
  )
}
export default LayoutContent