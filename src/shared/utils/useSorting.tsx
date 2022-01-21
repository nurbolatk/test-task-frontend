import { useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { SortField } from '../api/tasks'
import { useCallback, useMemo } from 'react'

export function useSorting() {
  const [queryParams] = useSearchParams()
  const location = useLocation()
  const sortField = useMemo(() => queryParams.get('sort_field') ?? SortField.ID, [queryParams])
  const sortDirection = useMemo(() => queryParams.get('sort_direction') ?? 'asc', [queryParams])
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
