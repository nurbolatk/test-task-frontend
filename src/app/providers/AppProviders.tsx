import React, { PropsWithChildren } from 'react'
import { AuthProvider, TasksProvider } from '.'

export const AppProviders = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  return (
    <AuthProvider>
      <TasksProvider>{children}</TasksProvider>
    </AuthProvider>
  )
}
