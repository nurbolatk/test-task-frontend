import { client } from 'shared/client'
import { FetchTasksResult, SortField } from './types'
import { DEFAULT_SORT_FIELD } from '../config'

export const fetchTasks = async (
  page = 1,
  sortField: SortField = DEFAULT_SORT_FIELD,
  sortDir: string
) => {
  const queryParams = new URLSearchParams()
  queryParams.append('page', String(page))
  queryParams.append('sort_field', sortField)
  queryParams.append('sort_direction', sortDir)

  const { tasks, total_task_count: totalCount } = await client<FetchTasksResult>('/', {
    queryParams,
  })
  return {
    tasks,
    totalCount: parseInt(totalCount),
  }
}
