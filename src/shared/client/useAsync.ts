import { useLayoutEffect } from 'react'
import { Dispatch, useCallback, useReducer, useRef } from 'react'
import { GeneralError } from './types'

export type RequestStatus = 'idle' | 'pending' | 'resolved' | 'rejected'

type State<T> = {
  data: T | null
  status: RequestStatus
  error: GeneralError | null
}

type Reducer<S> = (prevState: S, action: S) => S

const defaultInitialState: State<never> = {
  data: null,
  status: 'idle',
  error: null,
}

export function useAsync<T>(initialState?: State<T>) {
  const initialStateRef = useRef<State<T>>({
    ...defaultInitialState,
    ...initialState,
  })
  const [{ data, status, error }, unsafeDispatch] = useReducer<Reducer<State<T>>>(
    (state, action) => ({ ...state, ...action }),
    initialStateRef.current
  )

  const dispatch = useSafeDispatch(unsafeDispatch)

  const setData = useCallback(
    (data: T | null) => {
      dispatch({ status: 'resolved', data, error: null })
    },
    [dispatch]
  )

  const setError = useCallback(
    (error: GeneralError) => {
      dispatch({ status: 'rejected', error, data: null })
    },
    [dispatch]
  )

  const reset = useCallback(() => dispatch(initialStateRef.current), [dispatch])

  const run = useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error('The argument passed to run must be a promise')
      }
      dispatch({ status: 'pending', data: null, error: null })
      return promise
        .then((result) => {
          setData(result)
          return Promise.resolve(data)
        })
        .catch((e) => {
          setError(e)
          return Promise.reject(e)
        })
    },
    [data, dispatch, setData, setError]
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

function useSafeDispatch<T>(dispatch: Dispatch<State<T>>) {
  const mounted = useRef(false)

  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return useCallback((arg: State<T>) => (mounted.current ? dispatch(arg) : void 0), [dispatch])
}
