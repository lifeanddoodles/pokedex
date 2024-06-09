import styles from "./DescriptionList.module.css"
export * from "./DescriptionDetails"
export * from "./DescriptionTerm"

const DescriptionList = ({ children }: { children: React.ReactNode }) => {
  return <dl className={styles.descList}>{children}</dl>
}

export default DescriptionList
