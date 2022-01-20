import React, { useCallback } from 'react'
import { Task, getTaskStatus, getOppositeStatus } from '../model'
import { Checkbox } from 'shared/ui'
import { EditIcon, EmailIcon, UserIcon } from 'shared/ui/icons'
import { useAsync } from 'shared/client'
import { useAuth } from 'app/providers'
import { updateTask } from '../../../shared/api/tasks/updateTask'
import { useNavigate } from 'react-router'

type Props = {
  task: Task
}

export const TaskCard = ({ task }: Props): JSX.Element => {
  const { user } = useAuth()
  const { run } = useAsync()
  const navigate = useNavigate()

  const handleStatusChange = useCallback(() => {
    run(updateTask(task.id, { status: getOppositeStatus(task.status) }, user?.token ?? '')).then(
      () => {
        navigate('/login')
      }
    )
  }, [navigate, run, task.id, task.status, user?.token])

  const taskStatus = getTaskStatus(task.status)

  const isAdmin = !!user?.token

  return (
    <div className="card w-full">
      <Checkbox id={String(task.id)} checked={taskStatus.checked} onChange={handleStatusChange}>
        {taskStatus.status}
      </Checkbox>
      <div className={`bg-orange-200 p-5 -mx-5 mt-3 ${isAdmin ? 'group' : ''}`}>
        <div className="flex items-center justify-between">
          {task.text}
          {isAdmin && (
            <button className="group-hover:opacity-100 opacity-0 text-orange-500 w-5 h-5">
              <EditIcon />
            </button>
          )}
        </div>
        {taskStatus.helperText && (
          <p className="text-sm text-orange-500 mt-2">{taskStatus.helperText}</p>
        )}
      </div>

      <div className="flex items-center gap-3 mt-3">
        <p className="flex gap-2 items-center">
          <UserIcon className="w-4 h-4 text-orange-200" /> {task.username}
        </p>
        <p className="flex gap-2 items-center">
          <EmailIcon className="w-4 h-4 text-orange-200" />
          {task.email}
        </p>
      </div>
    </div>
  )
}
