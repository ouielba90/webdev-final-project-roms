import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRicardo from './AppRicardo.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  MessagesPage from './pages/MessagesPage.jsx'
import Home from './pages/Home.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />
        },/*
        {
          path: '/inventory',
          element: <AppOuissam />,
          children: [
            {
              index: true,
              element: <Dashboard></Dashboard>
            },
            {
              path: 'software',
              element: <SoftwareInv></SoftwareInv>
            },
            {
              path: 'hardware',
              element: <HardwareInv></HardwareInv>
            },
            {
              path: 'licenses',
              element: <LicensesInv></LicensesInv>
            },
            {
              path: 'servers',
              element: <ServersInv></ServersInv>
            },
            {
              path: 'add',
              element: <AddInv></AddInv>
            },
            {
              path: ':prodId',
            },
          ]
        },
        {
          path: '/projects',
          element: <ProjectsTest />,
          children: []
        },
        {
          path: '/users',
          element: <UsersTest />,
          children: []
        },*/
        {
          path: '/messages',
          element: <MessagesPage />,
          children: []
        },
        {
          path: '/notification',
          element: <NotificationsPage />,
          children: []
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
