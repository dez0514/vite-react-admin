import { Navigate } from 'react-router-dom'
import { Fragment, useContext, useEffect } from 'react'
import { Layout, Drawer } from 'antd';
import { UserContext } from "@/providers/user"
import LayoutHeader from './layoutHeader'
import LayoutContent from './layoutContent'
import LayoutSider from './layoutSider'
import { ConfigContext } from '@/providers/config';
import SettingBoard from './setting/settingBoard'


function Dashboard() {
  const userInfo = useContext(UserContext)
  const { configStates, dispatch } = useContext(ConfigContext)
  useEffect(() => {
    console.log('config==', configStates)
  }, [configStates])
  useEffect(() => {
    console.log('userInfo==', userInfo)
    console.log('userInfo==', userInfo.userCheck())
  }, [userInfo])
  return (
    <Fragment>
      { userInfo.userCheck() === false && <Navigate to="/login" replace /> }
      <Layout>
        <LayoutSider />
        <Layout className="site-layout">
          <LayoutHeader />
          <LayoutContent />
        </Layout>
      </Layout>
      <Drawer
        title="系统设置"
        placement='right'
        closable={true}
        open={configStates.openSettingDrawer}
        onClose={
          () => dispatch({ type: 'UPDATE_CONFIG', payload: { openSettingDrawer: false} })
        }
      >
        <SettingBoard />
      </Drawer>
    </Fragment>
  )
}

export default Dashboard