import Button from "../../components/Button"
import { capitalize } from "../../utils"

type ResultsItemProps = {
  className: string
  name: string
  onClick?: React.PointerEventHandler<HTMLButtonElement>
  onDoubleClick?: React.PointerEventHandler<HTMLButtonElement>
}

/**
 * Renders a single result item for a list of items.
 *
 * @param {string} className - The class name for the result item.
 * @param {string} name - The name of the item.
 * @param {React.PointerEventHandler<HTMLButtonElement>} onClick - The click event handler for the item.
 * @param {React.PointerEventHandler<HTMLButtonElement>} onDoubleClick - The double click event handler for the item.
 * @return {JSX.Element} The rendered result list item.
 */
const ResultsItem = ({
  className,
  name,
  onClick,
  onDoubleClick,
}: ResultsItemProps): JSX.Element => {
  return (
    <li className={className}>
      <Button
        className="button button--outline"
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        <h2>{capitalize(name)}</h2>
      </Button>
    </li>
  )
}

export default ResultsItem
