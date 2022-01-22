import React, { PropsWithChildren, useCallback, useEffect, useMemo, useReducer } from 'react'
import { SortField, TASKS_PER_PAGE } from 'shared/api/tasks'
import { useSearchParams } from 'react-router-dom'
import { reducer } from './reducer'
import * as taskModel from 'entities/task/model'
import { useSorting } from 'shared/utils'

type Task = taskModel.Task

export type TasksStore = {
  getTasks: (force?: boolean) => Promise<void> | undefined
  totalPages: number
  tasks: Task[]
  isLoading: boolean
}

const TasksContext = React.createContext<TasksStore | undefined>(undefined)

const TasksProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [state, dispatch] = useReducer(reducer, {
    tasks: new Map(),
    totalCount: 0,
    status: 'idle',
  })

  const [queryParams] = useSearchParams()
  const pageString = queryParams.get('page')
  const page = useMemo(() => parseInt(pageString ?? '1'), [pageString])
  const totalPages = Math.ceil(state.totalCount / TASKS_PER_PAGE)
  const { sortField, sortDirection } = useSorting()
  const currentPageTasks = useMemo(() => state.tasks.get(page - 1), [page, state.tasks])

  useEffect(() => {
    dispatch({
      type: 'RESET_TASKS',
    })
  }, [sortField, sortDirection])

  const getTasks = useCallback(
    (force = false) => {
      if (force || !currentPageTasks) {
        dispatch({
          type: 'SET_STATUS',
          payload: 'pending',
        })
        return taskModel
          .getTasks(page, sortField as SortField, sortDirection)
          .then(({ tasks, totalCount }) => {
            dispatch({
              type: 'SET_TASKS',
              payload: {
                tasks,
                totalCount,
                page,
              },
            })
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    [currentPageTasks, page, sortDirection, sortField]
  )

  const isLoading = state.status === 'idle' || state.status === 'pending'

  const value = {
    tasks: state.tasks.get(page - 1) ?? [],
    getTasks,
    totalPages,
    state,
    isLoading,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

function useTasks() {
  const context = React.useContext(TasksContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { TasksProvider, useTasks }
