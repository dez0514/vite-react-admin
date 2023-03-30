import { RootRouter } from '@/router'
import { ThemeProvider } from '@/providers/theme'
import { UserProvider } from '@/providers/user'
import { ConfigProvider } from '@/providers/config';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <ConfigProvider>
          <RootRouter />
        </ConfigProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
