import React from 'react'
import { useNavigate } from 'react-router'
import { CreateTaskForm } from 'entities/task'

export const CreateTask = () => {
  const navigate = useNavigate()
  const back = () => navigate(-1)

  return (
    <div className="max-w-3xl mx-auto">
      <button className="mb-3 ml-1" onClick={back}>
        &larr; Вернуться назад
      </button>
      <div className="card">
        <h2 className="mb-4">Создать задачу</h2>
        <CreateTaskForm />
      </div>
    </div>
  )
}
