import { User } from 'entities/user'
import { client } from 'shared/client'

const localStorageKey = '__test-tasks-token__'

async function getToken() {
  return window.localStorage.getItem(localStorageKey)
}

function setToken(token: string) {
  window.localStorage.setItem(localStorageKey, token)
  return token
}

async function login(username: string, password: string) {
  const user = await client<User>('/login', {
    data: { username, password },
  })
  setToken(user.token)
  return user
}

async function logout() {
  window.localStorage.removeItem(localStorageKey)
}

export { getToken, setToken, login, logout }
