// import { useState } from 'react'
import './App.less'
// import  MainPage from './pages/main'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function App() {
  const nav = useNavigate()
  useEffect(() => {
    nav('main-page/person-detail')
  }, [])
  return (
    <div className="main">
      <Outlet />
    </div>
  )
}

export default App
