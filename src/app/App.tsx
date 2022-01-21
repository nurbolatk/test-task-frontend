import React from 'react'
import './styles/index.css'
import { Outlet } from 'react-router-dom'
import { Navbar } from 'widgets'

export function App() {
  return (
    <>
      <Navbar />
      <main className="mt-6">
        <Outlet />
      </main>
    </>
  )
}
