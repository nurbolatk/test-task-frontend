import React, { useCallback, useRef, useState } from 'react'
import { Task, getOppositeStatus, adminitizeStatus } from '../model'
import { Checkbox, StatusMessage, OverlayLoader, StatusMessageList } from 'shared/ui'
import { CheckMarkIcon, EditIcon, EmailIcon, UserIcon } from 'shared/ui/icons'
import { useAsync } from 'shared/client'
import { useAuth, useTasks } from 'app/providers'
import { updateTask } from 'shared/api/tasks'

type Props = {
  task: Task
}

export const TaskCard = ({ task }: Props): JSX.Element => {
  const { user, isAdmin } = useAuth()
  const token = user?.token ?? ''

  const { run, isLoading, error, setError } = useAsync()
  const { getTasks } = useTasks()

  const [editMode, setEditMode] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleStatusChange = useCallback(() => {
    run(updateTask(task.id, { status: getOppositeStatus(task.statusCode) }, token)).then(() => {
      run(getTasks(true) as Promise<void>)
    })
  }, [getTasks, run, task.id, task.statusCode, token])

  const handleEditClick = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (editMode) {
        const newText = inputRef.current?.value === undefined ? '' : inputRef.current?.value
        if (newText !== task.text) {
          if (newText.length === 0) {
            return setError({ text: 'Текст задачи не может быть пустым' })
          }
          const newStatus = adminitizeStatus(task.statusCode)
          run(updateTask(task.id, { text: newText, status: newStatus }, token)).then(() =>
            run(getTasks(true) as Promise<void>)
          )
        }
        setEditMode(false)
      } else {
        setEditMode(true)
      }
    },
    [editMode, getTasks, run, setError, task.id, task.statusCode, task.text, token]
  )

  return (
    <div className={`card relative flex flex-col text-wrap ${isAdmin ? 'group' : ''}`}>
      <StatusMessageList messages={error} variant="error" className="mb-3" />
      <Checkbox
        id={String(task.id)}
        checked={task.checked}
        onChange={handleStatusChange}
        className={!isAdmin ? 'cursor-auto pointer-events-none' : ''}
        disabled={!isAdmin}>
        {task.status}
      </Checkbox>
      <div className="bg-orange-200 px-5 py-4 -mx-5 mt-3">
        <form className="flex items-center justify-between" onSubmit={handleEditClick}>
          {editMode ? (
            <input ref={inputRef} className="input" type="text" defaultValue={task.text} />
          ) : (
            <p className="py-1.5">{task.text}</p>
          )}
          {isAdmin && (
            <button
              type="submit"
              className="group-hover:opacity-100 opacity-0 text-orange-500 w-5 h-5 ml-3">
              {editMode ? <CheckMarkIcon /> : <EditIcon />}
            </button>
          )}
        </form>
        <StatusMessage variant="info" message={task} index="helperStatus" />
      </div>

      <div className="flex flex-wrap flex-1 items-center gap-3 mt-3">
        <p className="flex gap-2 items-center">
          <UserIcon className="w-3.5 h-3.5 text-orange-200 flex-shrink-0" /> {task.username}
        </p>
        <p className="flex gap-2 items-center">
          <EmailIcon className="w-4 h-4 text-orange-200 flex-shrink-0" />
          {task.email}
        </p>
      </div>

      {isLoading && <OverlayLoader />}
    </div>
  )
}
