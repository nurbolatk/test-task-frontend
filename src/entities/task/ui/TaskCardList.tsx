import React from 'react'
import { Skeleton, StatusMessage, StatusMessageList } from '../../../shared/ui'
import { TaskCard } from './TaskCard'
import { useTasks } from '../../../app/providers'

export const TaskCardList = (): JSX.Element => {
  const { tasks, isLoading, error } = useTasks()
  const showLoading = tasks.length === 0 && isLoading

  return (
    <div className="grid md:grid-cols-3 gap-3">
      {error ? (
        <StatusMessageList messages={error} variant="error" />
      ) : showLoading ? (
        <>
          <Skeleton className="w-full h-[12rem]" />
          <Skeleton className="w-full h-[12rem]" />
          <Skeleton className="w-full h-[12rem]" />
        </>
      ) : tasks.length === 0 ? (
        <StatusMessage variant="info" message="Вы еще не создали задачи" />
      ) : (
        tasks.map((task) => <TaskCard task={task} key={task.id} />)
      )}
    </div>
  )
}
