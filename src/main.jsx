import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import HomeInvPage from './pages/inventory/HomeInvPage.jsx'
import DashboardPage from './pages/inventory/DashboardPage.jsx'
import SoftwareInvPage from './pages/inventory/SoftwareInvPage.jsx'
import HardwareInvPage from './pages/inventory/HardwareInvPage.jsx'
import LicensesInvPage from './pages/inventory/LicensesInvPage.jsx'
import ServersInvPage from './pages/inventory/ServersInvPage.jsx'
import AddInvPage from './pages/inventory/AddToInvPage.jsx'
import './indexOuissam.css'
import UserHomePage from './pages/users/UserHomePage.jsx'
import HomeProjPage from './pages/projects/HomeProjPage.jsx'
import HomeCommPage from './pages/communications/HomeCommPage.jsx'
import MessagesPage from './pages/communications/MessagesPage.jsx'
import NotificationsPage from './pages/communications/NotificationsPage.jsx'
import UserPage from './pages/UserPage.jsx'

import ClientChatsPage from './pages/communications/ClientChatsPage.jsx'
import ChatViewPage from './pages/communications/ChatViewPage.jsx'
import InternalChatsPage from './pages/communications/InternalChatsPage.jsx'
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/inventory',
          element: <HomeInvPage />,
          children: [
            {
              index: true,
              element: <DashboardPage></DashboardPage>
            },
            {
              path: 'software',
              element: <SoftwareInvPage></SoftwareInvPage>
            },
            {
              path: 'hardware',
              element: <HardwareInvPage></HardwareInvPage>
            },
            {
              path: 'licenses',
              element: <LicensesInvPage></LicensesInvPage>
            },
            {
              path: 'servers',
              element: <ServersInvPage></ServersInvPage>
            },
            {
              path: 'add',
              element: <AddInvPage></AddInvPage>
            },
            {
              path: ':prodId',
            },
          ]
        },
        {
          path: '/projects',
          element: <HomeProjPage />,
          children: []
        },
        {
          path: '/users',
          element: <UserHomePage />,
          children: [
            {
              path: 'usersList',
              element: <UserPage />
            } 
          ]
        },
        {
  path: '/communications',
  element: <HomeCommPage />,
  children: [
    {
      path: 'messages',
      element: <MessagesPage />,
    },
    {
      path: 'notifications',
      element: <NotificationsPage />,
    },
   
    {
      path: 'internal-chats',
      element: <InternalChatsPage />,
    },
    {
      path: 'client-chats',
      element: <ClientChatsPage />,
    },
    {
      path: 'chat/:chatId',
      element: <ChatViewPage />,
    }
  ]
},
      ]
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
