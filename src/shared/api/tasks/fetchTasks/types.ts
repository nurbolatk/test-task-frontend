type NetworkTask = {
  id: number
  username: string
  email: string
  text: string
  status: 0 | 1 | 10 | 11
}

export type FetchTasksResult = {
  tasks: NetworkTask[]
  total_task_count: string
}

export enum SortField {
  ID = 'id',
  USERNAME = 'username',
  EMAIL = 'email',
  STATUS = 'status',
}
