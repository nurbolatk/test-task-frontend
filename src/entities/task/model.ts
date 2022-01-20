type TaskStatus = 0 | 1 | 10 | 11

export type Task = {
  id: number
  username: string
  email: string
  text: string
  status: TaskStatus
}

const statuses = {
  0: {
    status: 'Не выполнена',
    checked: false,
  },
  1: {
    status: 'Не выполнена',
    helperText: 'Отредактировано администратором',
    checked: false,
  },
  10: {
    status: 'Выполнена',
    checked: true,
  },
  11: {
    status: 'Выполнена',
    helperText: 'Отредактировано администратором',
    checked: true,
  },
}

export function getTaskStatus(status: TaskStatus): {
  status: string
  checked: boolean
  helperText?: string
} {
  return statuses[status]
}

const opposites = {
  0: 10,
  10: 0,
  1: 11,
  11: 1,
}

export function getOppositeStatus(oldStatus: TaskStatus) {
  return opposites[oldStatus]
}

const adminitized = {
  0: 1,
  1: 1,
  10: 11,
  11: 11,
}

export function adminitizeStatus(oldStatus: TaskStatus) {
  return adminitized[oldStatus]
}
