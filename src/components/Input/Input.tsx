import type { InputHTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'
import './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const wrapperClasses = ['input-field', error ? 'input-field--error' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="input-field__label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className="input-field__control">
        {leftIcon && (
          <span className="input-field__icon input-field__icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={[
            'input-field__input',
            leftIcon ? 'input-field__input--left-icon' : '',
            rightIcon ? 'input-field__input--right-icon' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {rightIcon && (
          <span className="input-field__icon input-field__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="input-field__message input-field__message--error">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="input-field__message input-field__message--hint">
          {hint}
        </p>
      )}
    </div>
  )
}
