import { CreateTaskForm } from 'entities/task'
import React from 'react'

export const CreateTask = () => {
  return (
    <div className="card max-w-3xl mx-auto">
      <h2 className="mb-4">Создать задачу</h2>
      <CreateTaskForm />
    </div>
  )
}
