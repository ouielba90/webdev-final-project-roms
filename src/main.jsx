import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppMarc from './AppMarc.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppMarc />
  </StrictMode>,
)
