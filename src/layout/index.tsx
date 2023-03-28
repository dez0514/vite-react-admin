import { Navigate } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { Layout } from 'antd';
import { UserContext } from "../providers/user"
import LayoutHeader from './layoutHeader'
import LayoutContent from './layoutContent'
import LayoutSider from './layoutSider'


function Dashboard() {
  const userInfo = useContext(UserContext)

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
      {/* <Drawer
        title="系统设置"
        placement='right'
        closable={true}
        open={isOpenDrawer}
        onClose={closeDrawer}
      >
        <Setting />
      </Drawer> */}
    </Fragment>
  )
}

export default Dashboard