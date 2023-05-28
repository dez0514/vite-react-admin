import { Fragment, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Layout, Drawer } from 'antd';
import LayoutHeader from './components/layoutHeader'
import LayoutContent from './components/layoutContent'
import LayoutSider from './components/layoutSider'
import SettingBoard from './components/setting/settingBoard'
import { updateConfig } from '@/actions';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
import { FormattedMessage } from "react-intl";
import { UserContext } from '@/userProvider'

function Dashboard() {
  const { isAuth } = useContext(UserContext)
  useEffect(() => {
    console.log('isAuth===', isAuth)
  }, [isAuth])
  const { openSettingDrawer } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const dispatch = useDispatch() 
  return (
    <Fragment>
      { !isAuth && <Navigate to="/login" /> }
      <Layout hasSider={true}>
        <LayoutSider/>
        <Layout>
          <LayoutHeader />
          <LayoutContent />
        </Layout>
      </Layout>
      <Drawer
        title={ <FormattedMessage id="layout.setting" /> }
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