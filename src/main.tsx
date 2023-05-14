import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'
import '@/styles/reset.scss'
import '@/styles/variable.scss'
import '@/styles/global.scss'
import '@/styles/tailwind.css'
import 'driver.js/dist/driver.min.css'; // guide
import '@/utils/beforeHandle'
import { Provider } from 'react-redux'
import reducers from '@/reducers/index'
import { configureStore } from "@reduxjs/toolkit";
// redux createStore方法已弃用。。。
const store = configureStore({
  reducer: reducers
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
