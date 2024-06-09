import { useCallback, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Button from "../../components/Button"
import { MAX_PAGE, OFFSET } from "../../utils/constants"
import {
  selectViewCurrentPokemonDetails,
  updateCurrentPokemon,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
} from "../currentPokemon/currentPokemonSlice"
import styles from "./Pagination.module.css"
import {
  selectCurrentPage,
  selectDisableNext,
  selectDisablePrev,
  updateOffset,
  updatePage,
} from "./paginationSlice"
import pokemonLogo from "/pokemon-icon.png"

/**
 * Renders a pagination component with buttons to navigate between results pages.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the pagination component.
 * @return {JSX.Element} The pagination component.
 */
const Pagination = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const currentPage = useAppSelector(selectCurrentPage)
  const newOffset = useMemo(() => (currentPage - 1) * OFFSET, [currentPage])
  const dispatch = useAppDispatch()
  const disablePrev = useAppSelector(selectDisablePrev)
  const disableNext = useAppSelector(selectDisableNext)
  /**
   * Determines if the current page is the details page.
   * If so, we don't need to show pagination controls
   */
  const onDetailsPage = useAppSelector(selectViewCurrentPokemonDetails)

  const handleDirection = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev") {
        dispatch(updatePage(currentPage - 1))
      } else {
        dispatch(updatePage(currentPage + 1))
      }
    },
    [currentPage, dispatch],
  )

  const handlePageUpdate = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // Reset current pokemon details when changing pages
      dispatch(updateCurrentPokemon(null))
      dispatch(updateCurrentPokemonId(null))
      dispatch(updateCurrentPokemonImg(pokemonLogo))

      // Handle page update to the appropriate direction
      handleDirection(e.currentTarget.id as "prev" | "next")
    },
    [dispatch, handleDirection],
  )

  useEffect(() => {
    dispatch(updateOffset(newOffset))
  }, [dispatch, newOffset])

  return (
    <section className={styles.pagination}>
      {children}
      {!onDetailsPage && (
        <section className={styles.controls}>
          <Button
            id="prev"
            className="button button--solid"
            onClick={e => handlePageUpdate(e)}
            disabled={disablePrev}
          >
            Prev
          </Button>
          <Button
            id="next"
            className="button button--solid"
            onClick={e => handlePageUpdate(e)}
            disabled={currentPage === MAX_PAGE || disableNext}
          >
            Next
          </Button>
        </section>
      )}
    </section>
  )
}

export default Pagination
