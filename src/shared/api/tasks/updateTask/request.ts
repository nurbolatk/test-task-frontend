import { client } from 'shared/client'
import { UpdateTaskBody } from './types'

export function updateTask(id: number, data: UpdateTaskBody, token: string) {
  return client(`/edit/${id}`, { data, token })
}
