import { Task } from 'entities/task'
import { client } from 'shared/client'

export const fetchTasks = async (
  page = 1,
  sortField: SortField = SortField.ID,
  sortDir: SortDir = 'asc'
) => {
  const { tasks, total_task_count: totalCount } = await client<FetchTasksResult>(
    `/?page=${page}&sort_field=${sortField}&sort_direction=${sortDir}`,
    {}
  )
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

type SortDir = 'asc' | 'desc'
