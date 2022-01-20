import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTasks } from '../app/providers'
import { TaskCard } from '../entities/task'

export const HomePage = (): JSX.Element => {
  const { getTasks, tasks, nextPage, prevPage } = useTasks()

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div className="container">
      <h2 className="flex items-center justify-between">
        Задачи
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

        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  )
}
