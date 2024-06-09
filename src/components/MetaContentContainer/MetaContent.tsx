import { capitalize } from "../../utils"
import { DescriptionDetails, DescriptionTerm } from "../DescriptionList"
import styles from "./MetaContentContainer.module.css"

export const MetaContent = ({
  items,
  start = 0,
  end,
}: {
  items: { label: string; value: string | string[] }[]
  start?: number
  end?: number
}): JSX.Element[] =>
  items.slice(start, end).map(({ label, value }) => {
    const formattedValue = value?.length
      ? (value as string[]).join(", ")
      : value

    return (
      <div role="group" key={label} className={styles.metaRow}>
        <DescriptionTerm>{capitalize(label)}</DescriptionTerm>
        <DescriptionDetails>{formattedValue}</DescriptionDetails>
      </div>
    )
  })
