import { useEffect, useMemo } from "react"
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

const Pagination = ({ children }: { children: React.ReactNode }) => {
  const currentPage = useAppSelector(selectCurrentPage)
  const newOffset = useMemo(() => (currentPage - 1) * OFFSET, [currentPage])
  const dispatch = useAppDispatch()
  const disablePrev = useAppSelector(selectDisablePrev)
  const disableNext = useAppSelector(selectDisableNext)
  const onDetailsPage = useAppSelector(selectViewCurrentPokemonDetails)

  const handleDirection = (direction: "prev" | "next") => {
    if (direction === "prev") {
      dispatch(updatePage(currentPage - 1))
    } else {
      dispatch(updatePage(currentPage + 1))
    }
  }

  const handlePageUpdate = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(updateCurrentPokemon(null))
    dispatch(updateCurrentPokemonId(null))
    dispatch(updateCurrentPokemonImg(pokemonLogo))

    handleDirection(e.currentTarget.id as "prev" | "next")
  }

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
