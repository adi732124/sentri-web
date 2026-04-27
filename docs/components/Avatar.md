# Avatar

Circular user representation with image, initials fallback, and status indicator.

## Location

`src/components/Avatar/`

| File | Purpose |
|---|---|
| `Avatar.tsx` | Component + TypeScript types |
| `Avatar.css` | Scoped styles; CSS custom properties for size scale |
| `Avatar.stories.tsx` | Storybook stories |

## Usage

```tsx
import { Avatar } from '@/components'

<Avatar name="John Doe" size="md" status="online" />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL; falls back to initials if absent or broken |
| `alt` | `string` | — | Alt text for the image |
| `name` | `string` | — | Used to derive initials (first letter of each word, max 2) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Diameter of the avatar |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | — | Status dot in the bottom-right corner |
| `className` | `string` | `''` | Additional CSS classes |

## Size Scale

| Size | Diameter |
|---|---|
| `xs` | 24px |
| `sm` | 32px |
| `md` | 40px |
| `lg` | 56px |
| `xl` | 72px |

## Status Colors

| Status | Color |
|---|---|
| `online` | Green `#22c55e` |
| `busy` | Red `#ef4444` |
| `away` | Amber `#f59e0b` |
| `offline` | Grey `#9ca3af` |

## Examples

```tsx
// Initials only
<Avatar name="John Doe" size="lg" />

// With image
<Avatar src="/avatars/jd.png" name="John Doe" size="md" />

// With status
<Avatar name="Jane Smith" size="md" status="online" />

// Group of avatars
{users.map((user) => (
  <Avatar key={user.id} name={user.name} src={user.avatar} size="sm" />
))}
```

## Notes

- Initials are derived by splitting `name` on whitespace, taking the first letter of each part (max 2), and uppercasing.
- The status dot size is 25% of the avatar diameter, maintaining visual proportion across all sizes.
- Status dot uses `border: 2px solid var(--bg)` to visually separate it from the avatar regardless of background color.
