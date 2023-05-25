import { Navigate } from 'react-router-dom'
import { Fragment, useCallback, useContext } from 'react'
import { Layout, Drawer } from 'antd';
import LayoutHeader from './components/layoutHeader'
import LayoutContent from './components/layoutContent'
import LayoutSider from './components/layoutSider'
import SettingBoard from './components/setting/settingBoard'
import { updateConfig } from '@/actions';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
import { FormattedMessage } from "react-intl";
import { userinfoReducerApi } from '@/reducers/userReducer'

function Dashboard() {
  const { openSettingDrawer } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const { token, userinfo } = useSelector((store: GlobalConfigState) => store.userReducer, shallowEqual)
  const dispatch = useDispatch() 

  const main = useCallback(()=>{
    return (<>
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
    </>)
  },[])

  const loadMain = useCallback(()=>{
    // debugger
    if(!token){
      return <Navigate to="/login" replace />
    }
    if(!userinfo){
      dispatch(userinfoReducerApi())
      return null;
    }
    return main()
  },[token,userinfo])
  return (
    <Fragment>
      { loadMain() }
      {/* <Layout hasSider={true}>
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
      </Drawer> */}
    </Fragment>
  )
}

export default Dashboard