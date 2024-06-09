import Range from "../../components/RangeGroup/Range"
import { getValue } from "../../utils"

const RangeGroup = ({
  label,
  resource,
  pathToValue,
}: {
  label: string
  resource: any
  pathToValue: string[]
}) => {
  const result = getValue(label, resource, pathToValue)

  return result.map((item: string[]) => (
    <Range key={item[0]} label={item[0]} value={Number(item[1])} />
  ))
}

export default RangeGroup
