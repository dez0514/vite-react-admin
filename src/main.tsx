// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'normalize.css'
import '@/styles/reset.scss'
import '@/styles/variable.scss'
import '@/styles/global.scss'
import '@/utils/beforeHandle'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <App />
  </>
)
