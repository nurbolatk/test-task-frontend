import { Task } from 'entities/task'
import { GeneralError, RequestStatus } from 'shared/client'
import { Reducer } from 'react'

type ActionType =
  | {
      type: 'SET_TASKS'
      payload: {
        tasks: Task[]
        totalCount: number
        page: number
      }
    }
  | {
      type: 'SET_STATUS'
      payload: RequestStatus
    }
  | {
      type: 'SET_ERROR'
      payload: GeneralError | null
    }
  | {
      type: 'RESET_TASKS'
    }

export type InternalState = {
  tasks: Map<number, Task[]>
  totalCount: number
  status: RequestStatus
  error: GeneralError | null
}

export const reducer: Reducer<InternalState, ActionType> = (
  state: InternalState,
  action: ActionType
) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        status: 'resolved',
        tasks: new Map(state.tasks).set(action.payload.page - 1, action.payload.tasks),
        totalCount: action.payload.totalCount,
        error: null,
      }
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      }

    case 'SET_ERROR':
      return {
        ...state,
        status: 'rejected',
        error: action.payload,
      }
    case 'RESET_TASKS':
      return {
        tasks: new Map(),
        totalCount: 0,
        status: 'idle',
        error: null,
      }
    default:
      return state
  }
}
