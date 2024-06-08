import { useAppSelector } from "../../app/hooks"
import {
  selectCurrentPokemon,
  type PokemonDetailsData,
} from "../../features/currentPokemon/currentPokemonSlice"
import { capitalize } from "../../utils"

const getData = (resource: PokemonDetailsData, labels: string[]) => {
  return labels.map(label => {
    return (
      <li>
        <p>
          <strong>{capitalize(label)}:</strong> {resource[label]}
        </p>
      </li>
    )
  })
}

const PokemonDetails = () => {
  const currentPokemon = useAppSelector(selectCurrentPokemon)

  if (!currentPokemon) {
    return <h1 role="status">No data available</h1>
  }

    return (
    <>
      <h1>{capitalize(currentPokemon.name)}</h1>
      <ul role="group">
        {getData(currentPokemon, [
          "height",
          "weight",
        ])}
      </ul>
    </>
  )
}

export default PokemonDetails
