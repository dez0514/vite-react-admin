import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'
import '@/styles/reset.scss'
import '@/styles/variable.scss'
import '@/styles/global.scss'
import '@/styles/tailwind.css'
import 'driver.js/dist/driver.min.css'; // guide
import { Provider } from 'react-redux'
import store from '@/reducers/index'
import '@/mock'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
