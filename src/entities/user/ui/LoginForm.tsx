import React from 'react'

type Props = {
  onSubmitLogin: (username: string, password: string) => void
}

export const LoginForm = ({ onSubmitLogin }: Props): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<LoginFormElement>) => {
    event.preventDefault()
    const { username, password } = event.currentTarget.elements
    onSubmitLogin(username.value, password.value)
  }

  return (
    <form noValidate className="space-y-3" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder={'Имя пользователя'} className="input" />
      <input type="password" name="password" placeholder={'Пароль'} className="input" />
      <button className="button" type="submit">
        Войти
      </button>
    </form>
  )
}

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}
interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements
}
