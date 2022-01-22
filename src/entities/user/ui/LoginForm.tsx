import React from 'react'
import { InputGroup } from 'shared/ui/'
import { useAuth } from 'app/providers'

export const LoginForm = (): JSX.Element => {
  const { login, error } = useAuth()

  const handleSubmit = (event: React.FormEvent<LoginFormElement>) => {
    event.preventDefault()
    const { username, password } = event.currentTarget.elements
    login(username.value, password.value)
  }

  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit}>
      <InputGroup error={error} type="text" name="username" placeholder="Имя пользователя" />
      <InputGroup error={error} type="password" name="password" placeholder="Пароль" />
      <button className="button" type="submit">
        Войти
      </button>
    </form>
  )
}

type FormElements = HTMLFormControlsCollection & {
  username: HTMLInputElement
  password: HTMLInputElement
}
type LoginFormElement = HTMLFormElement & {
  readonly elements: FormElements
}
