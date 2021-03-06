import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { App } from 'app/App'
import { HomePage } from 'pages/HomePage'
import { LoginPage } from 'pages/LoginPage'
import { AppProviders } from './providers'
import { CreateTask } from 'pages/CreateTask'

export const RoutedApp = (): JSX.Element => {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="tasks">
            <Route path="create" element={<CreateTask />} />
          </Route>
        </Route>
      </Routes>
    </AppProviders>
  )
}
