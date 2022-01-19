import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

export function usePagination() {
  const [queryParams] = useSearchParams()
  const page = queryParams.get('page')
  const pageInt = parseInt(page ?? '1')
  const navigate = useNavigate()

  const nextPage = useCallback(() => {
    navigate({
      pathname: '/',
      search: `page=${pageInt + 1}`,
    })
  }, [navigate, pageInt])
  console.log({ page })

  const prevPage = useCallback(() => {
    if (pageInt > 1) {
      navigate({
        pathname: '/',
        search: `page=${pageInt - 1}`,
      })
    }
  }, [navigate, pageInt])

  return { page: pageInt, nextPage, prevPage }
}
