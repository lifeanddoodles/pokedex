import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import Button from "../../components/Button"
import RangeGroup from "../../components/RangeGroup"
import {
  selectCurrentPokemon,
  toggleViewDetails,
  updateCurrentPokemon,
  updateCurrentPokemonId,
  updateCurrentPokemonImg,
  type PokemonDetailsData,
} from "../../features/currentPokemon/currentPokemonSlice"
import useCurrentPokemonDetails from "../../hooks/useCurrentPokemonDetails"
import { capitalize } from "../../utils"
import DetailsGroup from "./DetailsGroup"

const PokemonDetails = () => {
  const params = useParams()
  const paramsId = Number(params.id)
  /**
   * The current pokemon from the state or the single pokemon query,
   * if the current pokemon is null, due to a refresh, for example,
   * fetch the Pokemon from the API based on the id in the URL params.
   *
   * TODO: Look for a way to persist the current pokemon in the state
   */
  const currentPokemonFromState = useAppSelector(selectCurrentPokemon)
  const { singlePokemonData, isSinglePokemonSuccess } =
    useCurrentPokemonDetails(paramsId, currentPokemonFromState !== null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const goHomeFallbackEnabled = currentPokemonFromState === null

  const handleGoBack = () => {
    /**
     * If the current Pokemon is null, we probably came from a refresh
     * and the history stack might be empty, so add a fallback route.
     */
    if (!goHomeFallbackEnabled) return navigate(-1)
    return navigate("/")
  }

  const currentPokemon = currentPokemonFromState ?? singlePokemonData

  useEffect(() => {
    if (isSinglePokemonSuccess && singlePokemonData) {
      dispatch(
        updateCurrentPokemonImg(`${singlePokemonData?.sprites.front_default}`),
      )
      dispatch(updateCurrentPokemonId(singlePokemonData?.id as number))
      dispatch(updateCurrentPokemon(singlePokemonData as PokemonDetailsData))
      dispatch(toggleViewDetails(true))
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
      <Button className="button button--solid" onClick={handleGoBack}>
        Go back
      </Button>
      <h1>{capitalize(currentPokemon.name)}</h1>
      <DetailsGroup
        resource={currentPokemon}
        labels={[{ label: "height" }, { label: "weight" }]}
      />
      <DetailsGroup
        resource={currentPokemon}
        labels={[
          { label: "types", pathToValue: "type.name" },
          { label: "abilities", pathToValue: "ability.name" },
        ]}
      />
      <RangeGroup
        label="stats"
        resource={currentPokemon}
        pathToValue={["stat.name", "base_stat"]}
      />
    </>
  )
}

export default PokemonDetails
