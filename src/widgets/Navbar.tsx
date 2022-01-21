import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'app/providers'

export const Navbar = (): JSX.Element => {
  const { user, logout } = useAuth()

  const authLinks = user ? (
    <button className="button" onClick={logout}>
      Выйти
    </button>
  ) : (
    <Link to="/login" className="button">
      Войти
    </Link>
  )

  return (
    <header className="bg-white py-4 shadow shadow-orange-200">
      <nav className="container flex items-center justify-between">
        <Link to="/" className="text-xl">
          Главная
        </Link>
        {authLinks}
      </nav>
    </header>
  )
}
