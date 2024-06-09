import styles from "./Range.module.css"

const Range = ({ label, value }: { label: string; value: number }) => {
  const formattedLabel = label.replace(" ", "-").toLowerCase()

  return (
    <div className={styles.rangeInput} role="group">
      <label htmlFor={formattedLabel}>{label}</label>
      <input
        type="range"
        id={formattedLabel}
        name={label}
        min="0"
        max="100"
        value={value}
        readOnly
      />
    </div>
  )
}

export default Range
