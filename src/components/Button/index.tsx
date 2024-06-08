import { type ButtonProps } from "./Button.types"

const Button = ({
  children,
  onClick,
  onDoubleClick,
  disabled = false,
  id,
  className,
}: ButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}

export default Button
