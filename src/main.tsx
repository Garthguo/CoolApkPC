import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import MyApp from './routes'
import { HashRouter } from 'react-router-dom'
// import "@arco-design/web-react/dist/css/arco.css";
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <MyApp />
  </HashRouter>
)
