import { useCallback, useState } from 'react'

export function usePagination(totalPages: number) {
  const [page, setPage] = useState(1)

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }, [page, totalPages])

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  return { page, setPage, nextPage, prevPage }
}