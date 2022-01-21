import React from 'react'
import { usePagination } from '../../utils'

type Props = {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props): JSX.Element | null => {
  const { page, prevPage, nextPage, setPage } = usePagination()

  const currentPageStyles = (thatPage: number) => {
    const isCurrent = page === thatPage
    return isCurrent ? 'pointer-events-none' : 'outlined'
  }

  return totalPages > 0 ? (
    <div className="space-x-3 mt-4 flex items-center">
      <button className="button" onClick={prevPage} disabled={page <= 1}>
        Назад
      </button>
      {Array.from({ length: totalPages }).map((_, index) => {
        const thisPage = index + 1
        return (
          <button
            key={index}
            onClick={() => setPage(thisPage)}
            className={`button w-11 h-11 ${currentPageStyles(thisPage)}`}>
            {thisPage}
          </button>
        )
      })}
      <button className="button" onClick={nextPage} disabled={page >= totalPages}>
        Вперед
      </button>
    </div>
  ) : null
}
