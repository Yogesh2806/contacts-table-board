import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Icon } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-action text-on-action hover:bg-action-hover',
  secondary: 'border border-line-strong bg-surface text-ink hover:bg-hover',
  ghost: 'text-ink hover:bg-hover',
  danger: 'bg-danger-solid text-white hover:opacity-90 [[data-theme=dark]_&]:text-[#111]',
}

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  iconStart?: string
}

/** Aa NAD button: verb-first labels, sentence case, presses to 97%. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', iconStart, className = '', children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold transition-[background-color,transform] duration-100 ease-standard active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {iconStart && <Icon name={iconStart} size={16} />}
      {children}
    </button>
  )
})

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  /** Required: the accessible name and tooltip. */
  label: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, className = '', type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-hover hover:text-ink disabled:pointer-events-none disabled:opacity-40 ${className}`}
      {...rest}
    >
      <Icon name={icon} size={16} />
    </button>
  )
})
