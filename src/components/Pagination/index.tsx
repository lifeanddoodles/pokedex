import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectDisableNext,
  selectDisablePrev,
  updateOffset,
} from "../../features/pagination/paginationSlice"
import styles from "./Pagination.module.css"

const OFFSET = 20

const Pagination = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const newOffset = useMemo(() => (currentPage - 1) * OFFSET, [currentPage])
  const dispatch = useAppDispatch()
  const disablePrev = useAppSelector(selectDisablePrev)
  const disableNext = useAppSelector(selectDisableNext)

  useEffect(() => {
    dispatch(updateOffset(newOffset))
  }, [dispatch, newOffset])

  return (
    <section className={styles.pagination}>
      {children}
      <section className={styles.controls}>
        <button
          className="button"
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={disablePrev}
        >
          Prev
        </button>
        <button
          className="button"
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={disableNext}
        >
          Next
        </button>
      </section>
    </section>
  )
}

export default Pagination
