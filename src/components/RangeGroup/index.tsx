import Range from "../../components/RangeGroup/Range"
import { getValue } from "../../utils"

/**
 * Renders a group of range inputs based on the provided props.
 *
 * @param {Object} props - The props object.
 * @param {string} props.label - The label for the group.
 * @param {any} props.resource - The resource object.
 * @param {string[]} props.pathToValue - The path to the value in the resource object.
 * @return {JSX.Element[]} An array of Range components.
 */
const RangeGroup = ({
  label,
  resource,
  pathToValue,
}: {
  label: string
  resource: any
  pathToValue: string[]
}): JSX.Element[] => {
  const result = getValue(label, resource, pathToValue)

  return result.map((item: string[]) => (
    <Range key={item[0]} label={item[0]} value={Number(item[1])} />
  ))
}

export default RangeGroup
