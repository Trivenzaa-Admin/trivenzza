import { Link } from 'react-router-dom'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  to?: string
  disabled?: boolean
}

export default function Button({
  variant = 'primary',
  children,
  onClick,
  type = 'button',
  className = '',
  to,
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-8 py-3 text-xs font-label font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-primary-container text-on-primary-container hover:bg-inverse-primary active:scale-95',
    secondary:
      'border border-outline-variant/40 text-on-surface hover:bg-surface-container-high active:scale-95',
    ghost:
      'border border-on-surface/20 text-on-surface hover:border-primary hover:text-primary active:scale-95',
    glow:
      'cinematic-glow text-on-primary-container shadow-primary-glow hover:opacity-90 active:scale-95',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
