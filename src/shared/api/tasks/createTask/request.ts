import { Task } from 'entities/task'
import { client } from 'shared/client'
import { CreateTaskBody } from './types'

export function createTask(data: CreateTaskBody) {
  return client<Task>('/create', { data })
}
