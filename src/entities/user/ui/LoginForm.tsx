import React from 'react'
import { ErrorMessage } from 'shared/ui/'
import { useAuth } from '../../../app/providers'

export const LoginForm = (): JSX.Element => {
  const { login, error: errors } = useAuth()

  const handleSubmit = (event: React.FormEvent<LoginFormElement>) => {
    event.preventDefault()
    const { username, password } = event.currentTarget.elements
    login(username.value, password.value)
  }

  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <input type="text" name="username" placeholder={'Имя пользователя'} className="input" />
        {errors?.username && <ErrorMessage message={errors.username} />}
      </div>
      <div>
        <input type="password" name="password" placeholder={'Пароль'} className="input" />
        {errors?.password && <ErrorMessage message={errors.password} />}
      </div>
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
