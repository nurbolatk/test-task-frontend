import React from 'react'
import { ErrorMessage } from 'shared/ui/'

type Props = {
  onSubmitLogin: (username: string, password: string) => void
  errors: LoginFormErrors | null
}

export const LoginForm = ({ onSubmitLogin, errors }: Props): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<LoginFormElement>) => {
    event.preventDefault()
    const { username, password } = event.currentTarget.elements
    onSubmitLogin(username.value, password.value)
  }

  return (
    <form noValidate className="space-y-3" onSubmit={handleSubmit}>
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
type LoginFormErrors = {
  username: string | null | undefined
  password: string | null | undefined
}
