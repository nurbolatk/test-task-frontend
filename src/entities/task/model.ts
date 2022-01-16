export type Task = {
  id: number
  username: string
  email: string
  text: string
  status: number
}

export const TaskStatuses = {
  0: 'Не выполнена',
  1: 'Не выполнена',
  10: 'Выполнена',
  11: 'Выполнена',
}
