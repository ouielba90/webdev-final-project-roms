import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProviderDataApi from "./context/ProviderDataApi"
import App from './App.jsx'

import HomeInvPage from './pages/inventory/HomeInvPage.jsx'
import DashboardPage from './pages/inventory/DashboardPage.jsx'
import SoftwareInvPage from './pages/inventory/SoftwareInvPage.jsx'
import HardwareInvPage from './pages/inventory/HardwareInvPage.jsx'
import LicensesInvPage from './pages/inventory/LicensesInvPage.jsx'
import ServersInvPage from './pages/inventory/ServersInvPage.jsx'
import SoftwareDetailsPage from './pages/inventory/SoftwareDetailsPage.jsx'
import HardwareDetailsPage from './pages/inventory/HardwareDetailsPage.jsx'
import LicensesDetailsPage from './pages/inventory/LicensesDetailsPage.jsx'
import ServersDetailsPage from './pages/inventory/ServersDetailsPage.jsx'
import './indexOuissam.css'

import HomeProjPage from './pages/projects/HomeProjPage.jsx'
import HomeCommPage from './pages/communications/HomeCommPage.jsx'
import MessagesPage from './pages/communications/MessagesPage.jsx'
import NotificationsPage from './pages/communications/NotificationsPage.jsx'

import UserHomePage from './pages/usersClients/UserHomePage.jsx'
import UserPage from './pages/usersClients/users/UserPage.jsx'
import ClientPage from './pages/usersClients/clients/ClientPage.jsx'

import ClientChatsPage from './pages/communications/ClientChatsPage.jsx'
import ChatViewPage from './pages/communications/ChatViewPage.jsx'
import InternalChatsPage from './pages/communications/InternalChatsPage.jsx'

// Definición de rutas anidadas:
// el menú superior mientras cambia el contenido en <Outlet />.
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        //{
        //  index: true,
        //  element: <Home />
        //},
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
              element: <SoftwareInvPage></SoftwareInvPage>,
            },
            {
              path: 'software/:id',
              element: <SoftwareDetailsPage></SoftwareDetailsPage>
            },
            {
              path: 'hardware',
              element: <HardwareInvPage></HardwareInvPage>
            },
            {
              path: 'hardware/:id',
              element: <HardwareDetailsPage></HardwareDetailsPage>
            },
            {
              path: 'licenses',
              element: <LicensesInvPage></LicensesInvPage>
            },
            {
              path: 'licenses/:id',
              element: <LicensesDetailsPage></LicensesDetailsPage>
            },
            {
              path: 'servers',
              element: <ServersInvPage></ServersInvPage>
            },
            {
              path: 'servers/:id',
              element: <ServersDetailsPage></ServersDetailsPage>
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
            },
            {
              path: 'clientsList',
              element: <ClientPage />
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
    {/*Carga los datos de la API y crea el estado global.*/}
    <ProviderDataApi>
      {/*Muestra la interfaz de usuario correcta según la URL, usando los datos del Provider.*/}
      <RouterProvider router={router} />
    </ProviderDataApi>
  </StrictMode>,
)
