export type TaskStatus = 0 | 1 | 10 | 11

export type Task = {
  id: number
  username: string
  email: string
  text: string
  statusCode: TaskStatus
  checked: boolean
  status: string
  helperStatus?: string
}

export type GetTasksResult = {
  tasks: Task[]
  totalCount: number
}
