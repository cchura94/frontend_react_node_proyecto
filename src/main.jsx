import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './views/auth/Login.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <App />
  </BrowserRouter>
)
