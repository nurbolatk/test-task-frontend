import { TaskStatus } from './types'

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

export const statuses: Record<
  TaskStatus,
  { status: string; helperStatus?: string; checked: boolean }
> = {
  0: {
    status: 'Не выполнена',
    checked: false,
  },
  1: {
    status: 'Не выполнена',
    helperStatus: 'Отредактировано администратором',
    checked: false,
  },
  10: {
    status: 'Выполнена',
    checked: true,
  },
  11: {
    status: 'Выполнена',
    helperStatus: 'Отредактировано администратором',
    checked: true,
  },
}
