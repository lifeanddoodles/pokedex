import { capitalize } from "../../utils"
import { DescriptionDetails, DescriptionTerm } from "../DescriptionList"
import styles from "./MetaContentContainer.module.css"

/**
 * Renders a list of description terms and description details pairs.
 *
 * @param {Object} props - The properties for the component.
 * @param {Array} props.items - An array of objects containing label and value properties.
 * @param {number} [props.start] - The starting index of the items to render. Default is 0.
 * @param {number} [props.end] - The ending index of the items to render. Default is the length of the items array.
 * @return {Array} An array of JSX elements representing the meta content items.
 */
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
