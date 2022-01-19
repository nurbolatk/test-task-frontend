import { Task } from 'entities/task'
import { client } from 'shared/client'

export function createTask(data: CreateTaskBody) {
  return client<Task>('/create', { data })
}

export type CreateTaskBody = {
  username: string
  email: string
  text: string
}
