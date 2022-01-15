import { User } from 'entities/user'
import React, { PropsWithChildren, useEffect } from 'react'
import { useAsync } from 'shared/client'
import * as auth from 'shared/auth'

type AuthContextValue = {
  user: User | null
  error: never | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}
const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { data: user, error, isLoading, isIdle, run, setData } = useAsync<User>()

  const login = React.useCallback(
    (username: string, password: string) => run(auth.login(username, password)),
    [setData]
  )
  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  useEffect(() => {
    auth.getToken().then((token) => {
      if (token) {
        setData({ token })
      } else {
        setData(null)
      }
    })
  }, [])

  const value = React.useMemo(() => ({ user, error, login, logout }), [login, logout, user])

  if (isLoading || isIdle) {
    return <p>Загрузка...</p>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
