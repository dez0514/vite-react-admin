import { RootRouter } from '@/router'
import { ThemeProvider } from '@/providers/theme'
import { UserProvider } from '@/providers/user'
import { Spin } from 'antd'
import { shallowEqual, useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'


function App() {
  const { showGlobalLoading } = useSelector((state: GlobalConfigState) => state.globalConfig, shallowEqual)
  return (
    <ThemeProvider>
      <UserProvider>
        <Spin
          spinning={showGlobalLoading}
          tip='Loading...'
          style={{ maxHeight: 'unset' }}
        >
          <RootRouter />
        </Spin>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
