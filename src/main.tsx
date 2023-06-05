// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import store from '@/reducers/index' // 坑：最好在 App 之前引入
import App from './App'
import 'normalize.css'
import '@/styles/reset.scss'
import '@/styles/global.scss'
import '@/styles/tailwind.css'
import 'driver.js/dist/driver.min.css'; // guide
import { Provider } from 'react-redux'
import '@/mock'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
)
