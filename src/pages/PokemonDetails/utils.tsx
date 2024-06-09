import { type PokemonDetailsData } from "../../features/currentPokemon/currentPokemonSlice"
import { getValue } from "../../utils"

export const formatMetaContent = (
  resource: PokemonDetailsData,
  labels: { label: string; pathToValue?: string }[],
) => {
  return labels.map(
    ({ label, pathToValue }: { label: string; pathToValue?: string }) => {
      const value = getValue(label, resource, pathToValue)
      return { label, value }
    },
  )
}
