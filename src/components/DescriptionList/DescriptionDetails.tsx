import styles from "./DescriptionList.module.css"

export const DescriptionDetails = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <dd className={styles.descDetails}>{children}</dd>
}
