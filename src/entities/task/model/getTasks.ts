import { fetchTasks, SortField } from 'shared/api/tasks'
import { GetTasksResult, Task } from './types'
import { statuses } from './statuses'

export function getTasks(
  page: number,
  sortField: SortField,
  sortDirection: string
): Promise<GetTasksResult> {
  return fetchTasks(page, sortField, sortDirection).then((result) => {
    const { totalCount, tasks: networkTasks } = result
    const tasks = networkTasks.map<Task>((task) => {
      const { id, username, email, text } = task
      const { checked, status, helperStatus } = statuses[task.status]
      return {
        id,
        username,
        email,
        text,
        checked,
        status,
        statusCode: task.status,
        helperStatus,
      }
    })
    return {
      tasks,
      totalCount,
    }
  })
}
