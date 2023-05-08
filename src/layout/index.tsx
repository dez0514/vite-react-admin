import { Navigate } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { Layout, Drawer } from 'antd';
import { UserContext } from "@/providers/user"
import LayoutHeader from './layoutHeader'
import LayoutContent from './layoutContent'
import LayoutSider from './layoutSider'
import SettingBoard from './setting/settingBoard'
import { updateConfig } from '@/actions';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'

function Dashboard() {
  const userInfo = useContext(UserContext)
  const { openSettingDrawer } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const dispatch = useDispatch() 
  return (
    <Fragment>
      { userInfo.userCheck() === false && <Navigate to="/login" replace /> }
      <Layout style={{ willChange: 'transform', display: 'flex', alignItems: 'flex-start', width: '100vw', height: '100vh' }}>
        <LayoutSider style={{ height: '100vh'}} />
        <Layout style={{ height: '100vh', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <LayoutHeader />
          <LayoutContent />
        </Layout>
      </Layout>
      <Drawer
        title="系统设置"
        placement='right'
        closable={true}
        open={openSettingDrawer}
        onClose={
          () => dispatch(updateConfig({ openSettingDrawer: false}))
        }
      >
        <SettingBoard />
      </Drawer>
    </Fragment>
  )
}

export default Dashboard