import React, { useEffect, useRef } from 'react'
import { InputGroup, OverlayLoader, StatusMessage } from 'shared/ui'
import { useAsync } from 'shared/client'
import { createTask } from 'shared/api/tasks'

export const CreateTaskForm = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)
  const { run, isSuccess, isLoading, error } = useAsync()

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
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-4 relative">
      <StatusMessage
        variant="success"
        index="task"
        message={isSuccess ? { task: 'Задача добавлена!' } : null}
      />
      <InputGroup error={error} name="username" type="text" placeholder="Имя пользователя" />
      <InputGroup error={error} type="email" name="email" placeholder="Электронная почта" />
      <InputGroup error={error} type="text" name="text" placeholder="Текст задачи" />
      <button className="button">Создать</button>
      {isLoading && <OverlayLoader />}
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
