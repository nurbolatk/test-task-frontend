import { client } from 'shared/client'

export function updateTask(id: number, data: UpdateTaskBody, token: string) {
  return client(`/edit/${id}`, { data, token })
}

export type UpdateTaskBody = Partial<{
  text: string
  status: number
}>
