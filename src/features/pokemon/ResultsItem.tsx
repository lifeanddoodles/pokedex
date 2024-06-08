import Button from "../../components/Button"
import { capitalize } from "../../utils"

type ResultsItemProps = {
  className: string
  name: string
  onClick?: React.PointerEventHandler<HTMLButtonElement>
  onDoubleClick?: React.PointerEventHandler<HTMLButtonElement>
}

const ResultsItem = ({
  className,
  name,
  onClick,
  onDoubleClick,
}: ResultsItemProps) => {
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
