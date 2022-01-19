import React, { PropsWithChildren, useEffect } from 'react'
import { client, useAsync } from 'shared/client'
import { Task } from 'entities/task'
import { fetchTasks } from 'shared/api/tasks'

type TasksStore = {
  tasks: Task[][] | null
  totalCount: number | null
}
const TasksContext = React.createContext<TasksStore | undefined>(undefined)

const TasksProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { data, error, isLoading, isIdle, run, setData } = useAsync<{
    tasks: Task[]
    totalCount: number
  }>()

  useEffect(() => {
    run(fetchTasks())
  }, [])

  return (
    <TasksContext.Provider value={{ tasks: null, totalCount: null }}>
      {children}
    </TasksContext.Provider>
  )
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
