import React, { useEffect } from 'react'
import { LoginForm } from 'entities/user'
import { useAuth } from 'app/providers'
import { useNavigate } from 'react-router'

export const LoginPage = (): JSX.Element => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/', {
        replace: true,
      })
    }
  }, [navigate, user])

  return (
    <section>
      <div className="max-w-3xl mx-auto card">
        <h2 className="text-xl mb-4">Пожалуйста, войдите</h2>
        <LoginForm />
      </div>
    </section>
  )
}
