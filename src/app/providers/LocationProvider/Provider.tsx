import React from 'react'
import { useLocation } from 'react-router-dom'
import { WithChildren } from 'shared/ui'

const LocationContext = React.createContext<string | undefined>(undefined)

export const LocationProvider = ({ children }: WithChildren): JSX.Element => {
  const location = useLocation()
  const currentPath = `${location.pathname}${location.search}`
  return <LocationContext.Provider value={currentPath}>{children}</LocationContext.Provider>
}

export function useCurrentPath(): string {
  const currentPath = React.useContext(LocationContext)
  if (currentPath === undefined) {
    throw new Error('useCurrentPath must be used inside LocationProvider')
  }
  return currentPath
}
