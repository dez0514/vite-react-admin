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
      <Layout hasSider={true}>
        <LayoutSider/>
        <Layout>
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