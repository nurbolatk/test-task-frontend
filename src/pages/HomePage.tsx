import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTasks } from '../app/providers'
import { SortTask, TaskCard } from '../entities/task'
import { Pagination } from '../shared/ui'

export const HomePage = (): JSX.Element => {
  const { getTasks, tasks, totalPages } = useTasks()

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div className="container">
      <h2 className="flex items-center justify-between">
        Задачи
        <SortTask />
        <Link to="/tasks/create" className="button">
          Создать
        </Link>
      </h2>
      <div>
        <div className="grid grid-cols-3 gap-3">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>

        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
