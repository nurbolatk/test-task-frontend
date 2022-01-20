import React from 'react'
import { Task } from '../model'
import { Checkbox } from 'shared/ui'
import { UserIcon } from '../../../shared/ui/icons/UserIcon'

type Props = {
  task: Task
}

export const TaskCard = ({ task }: Props): JSX.Element => {
  return (
    <div className="card w-full">
      <Checkbox id={String(task.id)}>Выполнено</Checkbox>

      <div className="bg-orange-200 p-5 -mx-5 my-3">{task.text}</div>
      <div className="flex items-center gap-3">
        <p>
          <UserIcon /> {task.username}
        </p>
        <p>{task.email}</p>
      </div>
    </div>
  )
}
