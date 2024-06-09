import { type ButtonProps } from "./Button.types"

/**
 * Renders a button component with the given props.
 *
 * @param {React.ReactNode} children - The content of the button.
 * @param {React.PointerEventHandler<HTMLButtonElement>} onClick - The event handler for the click event.
 * @param {React.PointerEventHandler<HTMLButtonElement>} onDoubleClick - The event handler for the double click event.
 * @param {boolean} disabled - Whether the button is disabled or not. Defaults to false.
 * @param {string} id - The id of the button.
 * @param {string} className - The class name of the button.
 * @return {JSX.Element} The rendered button component.
 */
const Button = ({
  children,
  onClick,
  onDoubleClick,
  disabled = false,
  id,
  className,
}: ButtonProps): JSX.Element => {
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
