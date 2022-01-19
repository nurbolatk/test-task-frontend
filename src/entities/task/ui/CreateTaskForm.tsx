import React, { useEffect, useRef } from 'react'
import { ErrorMessage } from 'shared/ui'
import { useAsync } from 'shared/client'
import { createTask } from 'shared/api/tasks'

export const CreateTaskForm = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)
  const { run, isSuccess, error: errors } = useAsync()

  const handleSubmit = (event: React.FormEvent<CreateTaskFormElement>) => {
    event.preventDefault()
    const { username, email, text } = event.currentTarget.elements
    run(
      createTask({
        username: username.value,
        email: email.value,
        text: text.value,
      })
    )
  }

  useEffect(() => {
    if (isSuccess) {
      formRef.current?.reset()
    }
  }, [isSuccess])

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input type="text" className="input" name="username" placeholder="Имя пользователя" />
        {errors?.username && <ErrorMessage message={errors.username} />}
      </div>
      <div>
        <input type="email" className="input" name="email" placeholder="Email" />
        {errors?.email && <ErrorMessage message={errors.email} />}
      </div>
      <div>
        <input type="text" className="input" name="text" placeholder="Текст задачи" />
        {errors?.text && <ErrorMessage message={errors.text} />}
      </div>
      <button className="button">Submit</button>
    </form>
  )
}

type FormElements = HTMLFormControlsCollection & {
  username: HTMLInputElement
  email: HTMLInputElement
  text: HTMLInputElement
}
type CreateTaskFormElement = HTMLFormElement & {
  readonly elements: FormElements
}
