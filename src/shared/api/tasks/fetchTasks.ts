import { Task } from 'entities/task'
import { client } from 'shared/client'

export const fetchTasks = async (page = 1, sortField: SortField = SortField.ID, sortDir = true) => {
  const queryParams = new URLSearchParams()
  queryParams.append('page', String(page))
  queryParams.append('sort_field', sortField)
  queryParams.append('sort_direction', sortDir ? 'asc' : 'desc')

  const { tasks, total_task_count: totalCount } = await client<FetchTasksResult>('/', {
    queryParams,
  })
  return {
    tasks,
    totalCount: parseInt(totalCount),
  }
}

type FetchTasksResult = {
  tasks: Task[]
  total_task_count: string
}

export enum SortField {
  ID = 'id',
  USERNAME = 'username',
  EMAIL = 'email',
  STATUS = 'status',
}
