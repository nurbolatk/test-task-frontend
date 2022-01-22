import React, { useEffect, useRef } from 'react'
import { InputGroup, OverlayLoader, StatusMessage } from 'shared/ui'
import { useAsync } from 'shared/client'
import { CreateTaskFormElement, createTask } from '../model'

export const CreateTaskForm = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null)
  const { run, isSuccess, isLoading, error, setError } = useAsync()

  const handleSubmit = (event: React.FormEvent<CreateTaskFormElement>) => {
    event.preventDefault()
    const result = createTask(event.currentTarget.elements)
    if (result instanceof Promise) run(result)
    else setError(result)
  }

  useEffect(() => {
    if (isSuccess) {
      formRef.current?.reset()
    }
  }, [isSuccess])

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-4 relative">
      <StatusMessage variant="success" message="Задача добавлена!" />
      <InputGroup error={error} name="username" type="text" placeholder="Имя пользователя" />
      <InputGroup error={error} type="email" name="email" placeholder="Электронная почта" />
      <InputGroup error={error} type="text" name="text" placeholder="Текст задачи" />
      <button className="button">Создать</button>
      {isLoading && <OverlayLoader />}
    </form>
  )
}
