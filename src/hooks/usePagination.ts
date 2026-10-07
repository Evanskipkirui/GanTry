import { useState } from 'react'

type UsePaginationOptions = {
  totalItems: number
  pageSize: number
  initialPage?: number
}

type UsePaginationResult = {
  page: number
  totalPages: number
  pageSize: number
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  reset: () => void
  canPrev: boolean
  canNext: boolean
  startIndex: number
  endIndex: number
  paginate: <T>(items: T[]) => T[]
}

function usePagination({
  totalItems,
  pageSize,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationResult {
  const [page, setPageRaw] = useState(initialPage)

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  // Clamp current page to valid range
  const safePage = Math.min(Math.max(1, page), totalPages)

  const setPage = (next: number) => {
    setPageRaw(Math.min(Math.max(1, next), totalPages))
  }

  const nextPage = () => {
    if (safePage < totalPages) setPageRaw(safePage + 1)
  }

  const prevPage = () => {
    if (safePage > 1) setPageRaw(safePage - 1)
  }

  const reset = () => setPageRaw(1)

  const startIndex = (safePage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const paginate = <T>(items: T[]): T[] => items.slice(startIndex, endIndex)

  return {
    page: safePage,
    totalPages,
    pageSize,
    setPage,
    nextPage,
    prevPage,
    reset,
    canPrev: safePage > 1,
    canNext: safePage < totalPages,
    startIndex,
    endIndex,
    paginate,
  }
}

export default usePagination
