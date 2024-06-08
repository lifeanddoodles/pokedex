export type ButtonProps = {
  children: React.ReactNode
  onClick?: React.PointerEventHandler<HTMLButtonElement>
  onDoubleClick?: React.PointerEventHandler<HTMLButtonElement>
  disabled?: boolean
  id?: string
  className?: string
}
