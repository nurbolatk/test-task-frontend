import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = (): JSX.Element => {
  return (
    <div>
      <h2 className="flex items-center justify-between">
        Задачи
        <Link to="/tasks/create" className="button">
          Создать
        </Link>
      </h2>
    </div>
  )
}
