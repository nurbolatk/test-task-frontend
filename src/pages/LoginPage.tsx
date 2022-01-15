import React from 'react'
import { LoginForm } from 'entities/user'
import { client, useAsync } from 'shared/client'

export const LoginPage = (): JSX.Element => {
  const { run, error } = useAsync<{ token: string }>(undefined)

  const handleSubmit = (username: string, password: string) => {
    run(
      client('/login', {
        data: {
          username,
          password,
        },
      })
    )
  }

  return (
    <section>
      <div className="mx-auto card">
        <h2 className="text-xl mb-4">Пожалуйста, войдите</h2>
        <LoginForm onSubmitLogin={handleSubmit} errors={error} />
      </div>
    </section>
  )
}
