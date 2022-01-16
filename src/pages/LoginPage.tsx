import React, { useEffect } from 'react'
import { LoginForm } from 'entities/user'
import { useAuth } from 'app/providers'
import { useNavigate } from 'react-router'

export const LoginPage = (): JSX.Element => {
  const { user, error, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/', {
        replace: true,
      })
    }
  }, [])

  const handleSubmit = (username: string, password: string) => {
    login(username, password)
  }

  console.log({ user, error })

  return (
    <section>
      <div className="mx-auto card">
        <h2 className="text-xl mb-4">Пожалуйста, войдите</h2>
        <LoginForm onSubmitLogin={handleSubmit} errors={error} />
      </div>
    </section>
  )
}
