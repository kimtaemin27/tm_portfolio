import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Stock from './pages/Stock.jsx'
import Automation from './pages/Automation.jsx'
import Excel from './pages/Excel.jsx'
import Career from './pages/Career.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'excel', element: <Excel /> },
        { path: 'stock', element: <Stock /> },
        { path: 'automation', element: <Automation /> },
        { path: 'career', element: <Career /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
