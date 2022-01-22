import React, { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, TasksProvider } from '../'
import { LocationProvider } from '../LocationProvider'

export const AppProviders = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LocationProvider>
          <TasksProvider>{children}</TasksProvider>
        </LocationProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}
