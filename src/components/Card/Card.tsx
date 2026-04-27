import type { ReactNode } from 'react'
import './Card.css'

export interface CardProps {
  title?: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
  className?: string
  bordered?: boolean
  shadow?: boolean
}

export function Card({
  title,
  description,
  children,
  footer,
  className = '',
  bordered = true,
  shadow = false,
}: CardProps) {
  const classes = [
    'card',
    bordered ? 'card--bordered' : '',
    shadow ? 'card--shadow' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {(title || description) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {description && <p className="card__description">{description}</p>}
        </div>
      )}
      {children && <div className="card__body">{children}</div>}
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  )
}
