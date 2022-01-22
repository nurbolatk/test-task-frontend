import { logout } from '../api/auth'

const api = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

type ClientOptions = Partial<
  {
    data: Record<string, string | number>
    token: string
    queryParams: URLSearchParams
  } & RequestInit
>

export const client = async <T>(endpoint: string, options: ClientOptions): Promise<T> => {
  const { data, token, queryParams, ...customConfig } = options
  const formData = new FormData()

  if (data) {
    for (const key in data) {
      formData.append(key, String(data[key]))
    }
  }
  if (token) {
    formData.append('token', token)
  }

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? formData : undefined,
    ...customConfig,
  }

  return window
    .fetch(`${api}${endpoint}?developer=Nurbolat&${queryParams?.toString()}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        alert(401)
        logout()
        window.location.assign('/')
        return Promise.reject({ token: 'Токен истек' })
      }
      const data = await response.json()

      if (response.ok) {
        if (data.status === 'error') {
          if (data.message.token) {
            logout()
          }
          return Promise.reject(data.message)
        }
        return data.message
      } else {
        return Promise.reject(data.message)
      }
    })
}
