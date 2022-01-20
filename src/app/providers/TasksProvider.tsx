import React, { PropsWithChildren, useCallback, useState } from 'react'
import { Task } from 'entities/task'
import { fetchTasks, TASKS_PER_PAGE } from 'shared/api/tasks'
import { usePagination } from 'shared/utils'

type TasksStore = {
  getTasks: (force?: boolean) => void
  nextPage: () => void
  prevPage: () => void
  page: number
  tasks: Task[]
  totalCount: number | null
}

const TasksContext = React.createContext<TasksStore | undefined>(undefined)

const TasksProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [state, setState] = useState<{
    tasks: Task[][]
    totalCount: number | null
  }>({
    tasks: [],
    totalCount: null,
  })

  const { page, prevPage, nextPage } = usePagination()

  const getTasks = useCallback(
    (force = false) => {
      if (force || !state.tasks[page - 1]) {
        fetchTasks(page)
          .then((result) => {
            const { totalCount } = result
            const totalPages = Math.ceil(totalCount / TASKS_PER_PAGE)

            setState((state) => {
              const tasks = [...state.tasks]
              tasks[page - 1] = result.tasks
              return {
                tasks,
                totalCount,
              }
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    [page, state.tasks]
  )

  const value = {
    tasks: state.tasks[page - 1] ?? [],
    totalCount: state.totalCount,
    getTasks,
    nextPage,
    prevPage,
    page,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

function useTasks() {
  const context = React.useContext(TasksContext)
  console.log(context)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { TasksProvider, useTasks }
