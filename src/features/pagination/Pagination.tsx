import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { MAX_PAGE, OFFSET } from "../../utils/constants"
import { selectViewCurrentPokemonDetails } from "../currentPokemon/currentPokemonSlice"
import styles from "./Pagination.module.css"
import {
  selectCurrentPage,
  selectDisableNext,
  selectDisablePrev,
  updateOffset,
  updatePage,
} from "./paginationSlice"

const Pagination = ({ children }: { children: React.ReactNode }) => {
  const currentPage = useAppSelector(selectCurrentPage)
  const newOffset = useMemo(() => (currentPage - 1) * OFFSET, [currentPage])
  const dispatch = useAppDispatch()
  const disablePrev = useAppSelector(selectDisablePrev)
  const disableNext = useAppSelector(selectDisableNext)
  const onDetailsPage = useAppSelector(selectViewCurrentPokemonDetails)

  useEffect(() => {
    dispatch(updateOffset(newOffset))
  }, [dispatch, newOffset])

  return (
    <section className={styles.pagination}>
      {children}
      {!onDetailsPage && (
        <section className={styles.controls}>
          <button
            className="button button--solid"
            onClick={() => dispatch(updatePage(currentPage - 1))}
            disabled={disablePrev}
          >
            Prev
          </button>
          <button
            className="button button--solid"
            onClick={() => dispatch(updatePage(currentPage + 1))}
            disabled={currentPage === MAX_PAGE || disableNext}
          >
            Next
          </button>
        </section>
      )}
    </section>
  )
}

export default Pagination
