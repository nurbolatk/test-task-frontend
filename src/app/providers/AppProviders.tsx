import React, { PropsWithChildren } from 'react'
import { AuthProvider, TasksProvider } from '.'
import { BrowserRouter } from 'react-router-dom'

export const AppProviders = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TasksProvider>{children}</TasksProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}
