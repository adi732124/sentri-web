import './Avatar.css'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  status?: AvatarStatus
  className?: string
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className = '',
}: AvatarProps) {
  const classes = ['avatar', `avatar--${size}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-label={name ?? alt}>
      {src ? (
        <img className="avatar__img" src={src} alt={alt ?? name ?? ''} />
      ) : (
        <span className="avatar__initials" aria-hidden="true">
          {name ? getInitials(name) : '?'}
        </span>
      )}
      {status && (
        <span
          className={`avatar__status avatar__status--${status}`}
          title={status}
          aria-label={`Status: ${status}`}
        />
      )}
    </span>
  )
}
