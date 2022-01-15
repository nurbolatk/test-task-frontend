import React from 'react'
import './styles/index.css'
import { Link, Outlet } from 'react-router-dom'

export function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <Outlet />
    </>
  )
}
