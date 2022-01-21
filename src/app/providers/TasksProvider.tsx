import React, { PropsWithChildren, Reducer, useCallback, useReducer } from 'react'
import { Task } from 'entities/task'
import { fetchTasks, SortField, TASKS_PER_PAGE } from 'shared/api/tasks'
import { useSearchParams } from 'react-router-dom'

type TasksStore = {
  getTasks: (force?: boolean) => Promise<void> | undefined
  totalPages: number
  tasks: Task[]
  sortBy: (newSort: SortField) => void
  state: InternalState
}

const TasksContext = React.createContext<TasksStore | undefined>(undefined)

type InternalState = {
  tasks: Map<number, Task[]>
  totalCount: number
  sortField: SortField
  isAsc: boolean
}

type ActionType =
  | { type: 'SORT_BY'; payload: SortField }
  | {
      type: 'SET_TASKS'
      payload: {
        tasks: Task[]
        totalCount: number
        page: number
      }
    }

const reducer: Reducer<InternalState, ActionType> = (state: InternalState, action: ActionType) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: new Map(state.tasks).set(action.payload.page - 1, action.payload.tasks),
        totalCount: action.payload.totalCount,
      }
    case 'SORT_BY':
      return {
        ...state,
        tasks: new Map(),
        sortField: action.payload,
        isAsc: action.payload === state.sortField ? !state.isAsc : state.isAsc,
      }
    default:
      return state
  }
}

const TasksProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [state, dispatch] = useReducer(reducer, {
    tasks: new Map(),
    totalCount: 0,
    sortField: SortField.ID,
    isAsc: true,
  })

  const [queryParams] = useSearchParams()
  const pageString = queryParams.get('page')
  const page = parseInt(pageString ?? '1')
  const totalPages = Math.ceil(state.totalCount / TASKS_PER_PAGE)

  const getTasks = useCallback(
    (force = false) => {
      if (force || !state.tasks.get(page - 1)) {
        return fetchTasks(page, state.sortField, state.isAsc)
          .then((result) => {
            const { totalCount, tasks } = result

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
    [page, state.isAsc, state.sortField, state.tasks]
  )

  const sortBy = useCallback((newSort: SortField) => {
    dispatch({
      type: 'SORT_BY',
      payload: newSort,
    })
  }, [])

  const value = {
    tasks: state.tasks.get(page - 1) ?? [],
    getTasks,
    totalPages,
    sortBy,
    state,
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
