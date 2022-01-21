import { useCallback } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

export function usePagination() {
  const [queryParams] = useSearchParams()
  const page = queryParams.get('page')
  const pageInt = parseInt(page ?? '1')
  const navigate = useNavigate()
  const location = useLocation()

  const setPage = useCallback(
    (page: number) => {
      queryParams.set('page', String(page))
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      })
    },
    [location.pathname, navigate, queryParams]
  )

  const nextPage = useCallback(() => {
    setPage(pageInt + 1)
  }, [pageInt, setPage])

  const prevPage = useCallback(() => {
    if (pageInt > 1) {
      setPage(pageInt - 1)
    }
  }, [pageInt, setPage])

  return { page: pageInt, nextPage, prevPage, setPage }
}
