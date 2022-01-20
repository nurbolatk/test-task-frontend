import React, { useCallback, useRef, useState } from 'react'
import { Task, getTaskStatus, getOppositeStatus, adminitizeStatus } from '../model'
import { Checkbox } from 'shared/ui'
import { CheckMarkIcon, EditIcon, EmailIcon, UserIcon } from 'shared/ui/icons'
import { useAsync } from 'shared/client'
import { useAuth, useTasks } from 'app/providers'
import { updateTask } from 'shared/api/tasks'
import { useNavigate } from 'react-router'

type Props = {
  task: Task
}

export const TaskCard = ({ task }: Props): JSX.Element => {
  const { user } = useAuth()
  const token = user?.token ?? ''
  const { run } = useAsync()
  const { getTasks } = useTasks()
  const [editMode, setEditMode] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleStatusChange = useCallback(() => {
    run(updateTask(task.id, { status: getOppositeStatus(task.status) }, token)).then(() => {
      getTasks(true)
    })
  }, [getTasks, run, task.id, task.status, token])

  const handleEditClick = useCallback(() => {
    if (editMode) {
      // send request
      const newText = inputRef.current?.value ?? task.text
      if (newText !== task.text) {
        const newStatus = adminitizeStatus(task.status)
        run(updateTask(task.id, { text: newText, status: newStatus }, token))
        setEditMode(false)
      }
    } else {
      setEditMode(true)
    }
  }, [editMode, run, task, token])

  const taskStatus = getTaskStatus(task.status)

  const isAdmin = !!user?.token

  return (
    <div className="card w-full">
      <Checkbox id={String(task.id)} checked={taskStatus.checked} onChange={handleStatusChange}>
        {taskStatus.status}
      </Checkbox>
      <div className={`bg-orange-200 px-5 py-4 -mx-5 mt-3 ${isAdmin ? 'group' : ''}`}>
        <div className="flex items-center justify-between">
          {editMode ? (
            <input ref={inputRef} className="input" type="text" defaultValue={task.text} />
          ) : (
            <p className="py-1.5">{task.text}</p>
          )}
          {isAdmin && (
            <button
              className="group-hover:opacity-100 opacity-0 text-orange-500 w-5 h-5 ml-3"
              onClick={handleEditClick}>
              {editMode ? <CheckMarkIcon /> : <EditIcon />}
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
