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
  const { openSettingDrawer, navType, nofixedHeader } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  const dispatch = useDispatch()
  const initLayout = () => {
    if(navType === 't') {
      return (
        <Layout hasSider={false}>
          <LayoutHeader hasSider={true} />
          <LayoutContent nofixheader={!!nofixedHeader} />
        </Layout>
      )
    } else if(navType === 'tl') {
      // 此布局 header 只能固定
      return (
        <Layout hasSider={false}>
          <LayoutHeader />
          <Layout hasSider={true}>
            <LayoutSider noLogo={true} subtractTagsHeight={true} />
            <LayoutContent nofixheader={false} />
          </Layout>
        </Layout>
      )
    }
    return (
      <Layout hasSider={true}>
        {/* header 不固定时 避免sider跟着滚动，让它 sticky */}
        <LayoutSider style={ nofixedHeader ? { maxHeight: '100vh',position: 'sticky', top: '0' } : {}}/>
        <Layout>
          <LayoutHeader noLogo={true} />
          <LayoutContent nofixheader={!!nofixedHeader} />
        </Layout>
      </Layout>
    )
  }
  if(!isAuth) return <Navigate to="/login" />
  return (
    <Fragment>
      { initLayout() }
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