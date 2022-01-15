const api = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

export const client = async <T>(
  endpoint: string,
  {
    data,
    token,
    ...customConfig
  }: Partial<
    {
      data: Record<string, string>
      token: string
    } & RequestInit
  >
): Promise<T> => {
  const formData = new FormData()

  if (data) {
    for (const key in data) {
      formData.append(key, data[key])
    }
  }

  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? formData : undefined,
    // headers: {
    //   // Authorization: token ? `Bearer ${token}` : '',
    //   // 'Content-Type': data ? 'multipart/form-data' : '',
    // },
    ...customConfig,
  }

  return window.fetch(`${api}${endpoint}?developer=Nurbolat`, config).then(async (response) => {
    if (response.status === 401) {
      alert(401)
      return Promise.reject({ message: 'Токен истек' })
    }
    const data = await response.json()
    if (response.ok) {
      if (data.status === 'error') {
        return Promise.reject(data.message)
      }
      return data.message
    } else {
      return Promise.reject(data.message)
    }
  })
}
