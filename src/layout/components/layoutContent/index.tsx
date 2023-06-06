import { Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { CONFIG } from '@/config'
import { shallowEqual, useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useEffect } from 'react'
const { Content } = Layout

const LayoutContent = ({ nofixheader = false }: { nofixheader?: boolean }) => {
  useEffect(() => {
    console.log('nofixheader==', nofixheader)
  }, [nofixheader])
  const location = useLocation()
  const { hideTagsView } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  return (
    <Content
      style={{
        height: nofixheader ? 'auto' : `calc(100vh - ${CONFIG.headerHeight}px - ${hideTagsView ? 0 : 41}px)`,
        overflow: 'hidden',
        overflowY: 'auto'
      }}
    >
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={500} exit={false}>
          <Outlet />
        </CSSTransition>
      </TransitionGroup>
    </Content>
  )
}
export default LayoutContent