import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BlackPineProvider from './context/BlackPineContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BlackPineProvider>
        <App />
      </BlackPineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
