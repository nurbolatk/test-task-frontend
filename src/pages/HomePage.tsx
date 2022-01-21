import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTasks } from '../app/providers'
import { SortTask, TaskCard } from '../entities/task'
import { Pagination } from '../shared/ui'

export const HomePage = (): JSX.Element => {
  const { getTasks, tasks, totalPages } = useTasks()

  console.log({ getTasks })

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div className="container">
      <div className="flex items-center mb-3">
        <h2 className="mr-3">Задачи</h2>
        <Link to="/tasks/create" className="button mr-auto">
          Создать
        </Link>
        <SortTask />
      </div>
      <div>
        <div className="grid md:grid-cols-3 gap-3">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>

        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
