import MetaContentContainer from "../../components/MetaContentContainer"
import { type PokemonDetailsData } from "../../features/currentPokemon/currentPokemonSlice"
import { formatMetaContent } from "./utils"

const DetailsGroup = ({
  resource,
  labels,
}: {
  resource: PokemonDetailsData
  labels: { label: string; pathToValue?: string }[]
}) => {
  const items = formatMetaContent(resource, labels)
  return <MetaContentContainer items={items} />
}

export default DetailsGroup
