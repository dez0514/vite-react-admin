import { RootRouter } from '@/router'
import { ThemeProvider } from '@/providers/theme'
import { UserProvider } from '@/providers/user'

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <RootRouter />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
