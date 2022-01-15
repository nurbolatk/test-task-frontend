import React from 'react'
import { LoginForm } from 'entities/user/ui/LoginForm'

export const LoginPage = (): JSX.Element => {
  const handleSubmit = (username: string, password: string) => {
    console.log(username, password)
  }

  return (
    <section>
      <div className="mx-auto border border-slate-400 p-5 w-max rounded-md">
        <h2 className="text-xl mb-4">Пожалуйста, войдите</h2>
        <LoginForm onSubmitLogin={handleSubmit} />
      </div>
    </section>
  )
}
