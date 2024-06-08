import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { capitalize } from "../../utils"
import {
  updateCurrentPokemon,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
  type PokemonDetailsData,
} from "../currentPokemon/currentPokemonSlice"
import {
  toggleDisableNext,
  toggleDisablePrev,
} from "../pagination/paginationSlice"
import styles from "./Pokemon.module.css"
import { useGetPokemonQuery, useGetSinglePokemonQuery } from "./pokemonApiSlice"

export const useCurrentPokemonDetails = (id: number | null) => {
  const {
    data: singlePokemonData,
    isError: isErrorPokemon,
    isLoading: isSinglePokemonLoading,
    isSuccess: isSinglePokemonSuccess,
  } = useGetSinglePokemonQuery(id!, { skip: id === null })

  return {
    singlePokemonData,
    isErrorPokemon,
    isSinglePokemonLoading,
    isSinglePokemonSuccess,
  }
}

export const Pokemon = ({ currentOffset = 0 }: { currentOffset?: number }) => {
  const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null)
  const { data, isError, isLoading, isSuccess } =
    useGetPokemonQuery(currentOffset)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { singlePokemonData, isSinglePokemonSuccess } =
    useCurrentPokemonDetails(currentPokemonId)

  useEffect(() => {
    if (data?.next && data?.prev) {
      dispatch(toggleDisablePrev(data?.prev === null ? true : false))
      dispatch(toggleDisableNext(data?.next === null ? true : false))
    }
  }, [data?.next, data?.prev, dispatch])

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
