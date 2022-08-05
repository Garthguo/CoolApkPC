import { useRoutes } from 'react-router-dom'
import App from './App'
import MainPage from './pages/main'
import SwitchRoute from './pages/components/SwitchRoute'

const MyApp = () => {
  return useRoutes([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/*',
          element: <SwitchRoute>{/*<MainPage />*/}</SwitchRoute>,
          // children: [{ path: 'right', element: <div>right</div> }],
        },
      ],
    },
  ])
}
export default MyApp
