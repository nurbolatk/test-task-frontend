import { useLayoutEffect } from 'react'
import { Dispatch, useCallback, useReducer, useRef } from 'react'

type State<T> = {
  data: T | null
  status: 'idle' | 'pending' | 'resolved' | 'rejected'
  error: Record<string, string> | null
}

type Reducer<S> = (prevState: S, action: S) => S

const defaultInitialState: State<never> = {
  data: null,
  status: 'pending',
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
    (error) => {
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
          console.log('result?', result)
          setData(result)
          return data
        })
        .catch((e) => {
          console.log('error?', e)
          setError(e)
          return e
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
