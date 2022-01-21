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
    <div className="gap-3 mt-4 flex flex-wrap items-center justify-center">
      <button className="button outlined" onClick={prevPage} disabled={page <= 1}>
        Назад
      </button>
      {Array.from({ length: totalPages }).map((_, index) => {
        const thisPage = index + 1
        return (
          <button
            key={index}
            onClick={() => setPage(thisPage)}
            className={`button w-10 h-10 ${currentPageStyles(thisPage)}`}>
            {thisPage}
          </button>
        )
      })}
      <button className="button outlined" onClick={nextPage} disabled={page >= totalPages}>
        Вперед
      </button>
    </div>
  ) : null
}
