import { useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { DEFAULT_SORT_DIRECTION, DEFAULT_SORT_FIELD, SortField } from '../api/tasks'
import { useCallback, useMemo } from 'react'

export function useSorting() {
  const [queryParams] = useSearchParams()
  const location = useLocation()
  const sortField = useMemo(
    () => queryParams.get('sort_field') ?? DEFAULT_SORT_FIELD,
    [queryParams]
  )
  const sortDirection = useMemo(
    () => queryParams.get('sort_direction') ?? DEFAULT_SORT_DIRECTION,
    [queryParams]
  )
  const navigate = useNavigate()

  const sortBy = useCallback(
    (newSortField: SortField) => {
      if (sortField === newSortField) {
        queryParams.set('sort_direction', sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        queryParams.set('sort_field', newSortField)
      }
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      })
    },
    [location.pathname, navigate, queryParams, sortDirection, sortField]
  )

  return { sortBy, sortDirection, sortField }
}
