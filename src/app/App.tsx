import React from 'react'
import './styles/index.css'
import { Link, Outlet } from 'react-router-dom'
import { AppProviders } from './providers'

export function App() {
  return (
    <AppProviders>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <Outlet />
    </AppProviders>
  )
}
