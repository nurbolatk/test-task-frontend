import React, { PropsWithChildren } from 'react'
import { AuthProvider } from '.'

export const AppProviders = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  return <AuthProvider>{children}</AuthProvider>
}
