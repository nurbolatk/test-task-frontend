import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTasks } from '../app/providers'

export const HomePage = (): JSX.Element => {
  const { getTasks, tasks, nextPage, prevPage } = useTasks()

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div>
      <h2 className="flex items-center justify-between">
        Задачи
        <Link to="/tasks/create" className="button">
          Создать
        </Link>
      </h2>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>

        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  )
}
