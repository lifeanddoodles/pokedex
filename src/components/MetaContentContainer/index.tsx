import DescriptionList from "../DescriptionList"
import { MetaContent } from "./MetaContent"
import styles from "./MetaContentContainer.module.css"

/**
 * Renders two columns of meta content based on the provided items and resource.
 *
 * @param {Record<string, string>} items - The items to render in the meta content.
 * @return {JSX.Element} The rendered description list with two meta content columns.
 */
const MetaContentContainer = ({
  items,
}: {
  items: { label: string; value: string }[]
}): JSX.Element => (
  <DescriptionList>
    <div className={styles.metaCol} data-testid="meta-container__column">
      <MetaContent
        items={items}
        start={0}
        end={Math.ceil(Object.keys(items).length / 2)}
      />
    </div>
    <div className={styles.metaCol} data-testid="meta-container__column">
      <MetaContent
        items={items}
        start={Math.ceil(Object.keys(items).length / 2)}
      />
    </div>
  </DescriptionList>
)

export default MetaContentContainer
