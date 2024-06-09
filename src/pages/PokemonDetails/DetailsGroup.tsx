import MetaContentContainer from "../../components/MetaContentContainer"
import { type PokemonDetailsData } from "../../features/currentPokemon/currentPokemonSlice"
import { formatMetaContent } from "../../utils"

/**
 * Renders a group of details for a Pokemon using the provided resource and labels.
 *
 * @param {Object} props - The properties for the DetailsGroup component.
 * @param {PokemonDetailsData} props.resource - The data for the Pokemon details.
 * @param {Array<{ label: string; pathToValue?: string }>} props.labels - The labels and paths to values for the details.
 * @return {JSX.Element} The rendered MetaContentContainer component with the formatted details.
 */
const DetailsGroup = ({
  resource,
  labels,
}: {
  resource: PokemonDetailsData
  labels: { label: string; pathToValue?: string }[]
}): JSX.Element => {
  const items = formatMetaContent(resource, labels)

  return <MetaContentContainer items={items} />
}

export default DetailsGroup
