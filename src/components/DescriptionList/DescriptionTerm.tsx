import styles from "./DescriptionList.module.css"

export const DescriptionTerm = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <dt className={styles.descTerm}>{children}</dt>
}
