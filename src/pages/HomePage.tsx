import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTasks } from 'app/providers'
import { SortTask, TaskCardList } from 'entities/task'
import { Pagination } from 'shared/ui'

export const HomePage = (): JSX.Element => {
  const { getTasks, totalPages } = useTasks()

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <div>
      <div className="flex items-center mb-3">
        <h2 className="mr-3">Задачи</h2>
        <Link to="/tasks/create" className="button mr-auto">
          Создать
        </Link>
        <SortTask />
      </div>
      <div>
        <TaskCardList />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
