import { logout } from '../api/auth'
import { GeneralError } from './types'

const api = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

type ClientOptions = Partial<
  {
    data: Record<string, string | number>
    token: string
    queryParams: URLSearchParams
  } & RequestInit
>

function transformError(error: GeneralError | string): GeneralError {
  if (typeof error === 'string') {
    return { error }
  }
  return error
}

function handleAuthError(error?: GeneralError | string): Promise<GeneralError> {
  logout()
  window.location.assign('/')
  return Promise.reject(error ? transformError(error) : { token: 'Токен истек' })
}

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
    .fetch(`${api}${endpoint}?${queryParams?.toString()}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        return handleAuthError()
      }
      const data = await response.json()

      if (response.ok) {
        if (data.status === 'error') {
          if (data.message.token) {
            return handleAuthError(data.message)
          } else {
            return Promise.reject(transformError(data.message))
          }
        }
        return data.message
      } else {
        return Promise.reject(transformError(data.message))
      }
    })
}
