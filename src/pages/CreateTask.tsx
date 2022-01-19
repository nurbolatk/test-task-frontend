import { CreateTaskForm } from 'entities/task'
import React from 'react'

export const CreateTask = () => {
  return (
    <div className="card">
      <h2>Создать задачу</h2>
      <CreateTaskForm />
    </div>
  )
}
