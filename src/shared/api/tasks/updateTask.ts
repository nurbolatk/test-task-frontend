import { client } from 'shared/client'

export function updateTask(id: number, data: UpdateTaskBody, token: string) {
  // if (data.text) {
  //   if (token) {
  //     const status = adminitizeStatus(oldStatus)
  //   }
  // }

  return client(`/edit/${id}`, { data, token })
}

export type UpdateTaskBody = Partial<{
  text: string
  status: number
}>
