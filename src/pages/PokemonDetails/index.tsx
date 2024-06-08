import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectCurrentPokemon,
  updateCurrentPokemon,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
  type PokemonDetailsData,
} from "../../features/currentPokemon/currentPokemonSlice"
import useCurrentPokemonDetails from "../../hooks/useCurrentPokemonDetails"
import { capitalize } from "../../utils"

const getChildren = (resource: PokemonDetailsData, labels: string[]) => {
  return labels.map(label => {
    return (
      <li key={label}>
        <p>
          <strong>{capitalize(label)}:</strong> {resource[label]}
        </p>
      </li>
    )
  })
}

const PokemonDetails = () => {
  const params = useParams()
  const paramsId = Number(params.id)
  const currentPokemonFromState = useAppSelector(selectCurrentPokemon)
  const { singlePokemonData, isSinglePokemonSuccess } =
    useCurrentPokemonDetails(paramsId, currentPokemonFromState !== null)
  const dispatch = useAppDispatch()

  const currentPokemon = currentPokemonFromState ?? singlePokemonData

  useEffect(() => {
    if (
      currentPokemonFromState === null &&
      isSinglePokemonSuccess &&
      singlePokemonData
    ) {
      dispatch(
        updateCurrentPokemonImg(`${singlePokemonData?.sprites.front_default}`),
      )
      dispatch(updateCurrentPokemonId(singlePokemonData?.id as number))
      dispatch(updateCurrentPokemon(singlePokemonData as PokemonDetailsData))
    }
  }, [
    currentPokemonFromState,
    dispatch,
    isSinglePokemonSuccess,
    singlePokemonData,
  ])

  if (!currentPokemon) {
    return <h1 role="status">No data available</h1>
  }

  return (
    <>
      <h1>{capitalize(currentPokemon.name)}</h1>
      <ul role="group">
        {
          <Fragment key={currentPokemon.id}>
            {getChildren(currentPokemon, ["height", "weight"])}
          </Fragment>
        }
      </ul>
    </>
  )
}

export default PokemonDetails
