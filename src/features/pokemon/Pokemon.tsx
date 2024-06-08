import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import useCurrentPokemonDetails from "../../hooks/useCurrentPokemonDetails"
import { capitalize } from "../../utils"
import { LAST_PAGE_LIMIT, MAX_PAGE } from "../../utils/constants"
import {
  toggleViewDetails,
  updateCurrentPokemon,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
  type PokemonDetailsData,
} from "../currentPokemon/currentPokemonSlice"
import {
  selectCurrentOffset,
  selectCurrentPage,
  toggleDisableNext,
  toggleDisablePrev,
} from "../pagination/paginationSlice"
import styles from "./Pokemon.module.css"
import { useGetPokemonQuery } from "./pokemonApiSlice"

export const Pokemon = () => {
  const currentOffset = useAppSelector(selectCurrentOffset)
  const currentPage = useAppSelector(selectCurrentPage)
  const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null)
  const limit = useMemo(
    () => (currentPage === MAX_PAGE ? LAST_PAGE_LIMIT : 20),
    [currentPage],
  )
  const { data, isError, isLoading, isSuccess } = useGetPokemonQuery({
    offset: currentOffset,
    limit,
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { singlePokemonData, isSinglePokemonSuccess } =
    useCurrentPokemonDetails(currentPokemonId)

  useEffect(() => {
    if (data) {
      dispatch(toggleDisablePrev(!data?.previous))
      dispatch(toggleDisableNext(!data?.next))
    }
  }, [data, dispatch])

  useEffect(() => {
    if (isSinglePokemonSuccess && singlePokemonData) {
      dispatch(
        updateCurrentPokemonImg(`${singlePokemonData?.sprites.front_default}`),
      )
      dispatch(updateCurrentPokemonId(singlePokemonData?.id as number))
      dispatch(updateCurrentPokemon(singlePokemonData as PokemonDetailsData))
    }
  }, [isSinglePokemonSuccess, singlePokemonData, dispatch])

  const handleOnClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    setCurrentPokemonId(id)
  }

  const handleOnDoubleClick = (
    e: React.MouseEvent<HTMLElement>,
    url: string,
  ) => {
    e.preventDefault()
    dispatch(toggleViewDetails(true))
    return navigate(url)
  }

  if (isError) {
    return <h1 role="status">There was an error!!!</h1>
  }

  if (isLoading) {
    return <h1 role="status">Loading...</h1>
  }

  if (isSuccess) {
    return (
      <div>
        <ul className={styles.resultsContainer}>
          {data.results.map(({ name, url }) => {
            const id = Number(url.split("/").slice(-2, -1)[0])

            return (
              <li key={name} className={styles.resultsItem}>
                <button
                  className="button"
                  onClick={e => handleOnClick(e, id)}
                  onDoubleClick={e => handleOnDoubleClick(e, `/pokemon/${id}`)}
                >
                  <h2>{capitalize(name)}</h2>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return null
}
