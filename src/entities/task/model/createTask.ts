import isEmail from 'validator/es/lib/isEmail'
import isEmpty from 'validator/es/lib/isEmpty'
import { GeneralError } from 'shared/client'
import { CreateTaskFormControls, Task } from './types'
import * as api from 'shared/api/tasks'

export function createTask(inputs: CreateTaskFormControls): Promise<Task> | GeneralError {
  const { username, email, text } = inputs
  const errors: GeneralError = {}
  if (!isEmail(email.value)) {
    errors.email = 'Неправильный адрес почты'
  }
  if (isEmpty(username.value)) {
    errors.username = 'Не может быть пустым'
  }
  if (isEmpty(text.value)) {
    errors.text = 'Не может быть пустым'
  }

  if (Object.keys(errors).length > 0) {
    return errors
  }

  return api.createTask({
    username: username.value,
    email: email.value,
    text: text.value,
  })
}
