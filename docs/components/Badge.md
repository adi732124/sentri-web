# Badge

Compact inline label for status, state, or category.

## Location

`src/components/Badge/`

| File | Purpose |
|---|---|
| `Badge.tsx` | Component + TypeScript types |
| `Badge.css` | Scoped styles; dark-mode overrides included |
| `Badge.stories.tsx` | Storybook stories |

## Usage

```tsx
import { Badge } from '@/components'

<Badge variant="success" dot>Online</Badge>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'neutral'` | Semantic color |
| `size` | `'sm' \| 'md'` | `'md'` | Padding and font size |
| `dot` | `boolean` | `false` | Prepends a colored dot |
| `children` | `ReactNode` | — | Badge text (required) |
| `className` | `string` | `''` | Additional CSS classes |

## Variants

| Variant | Color | Typical use |
|---|---|---|
| `success` | Green | Active, online, completed |
| `warning` | Amber | Degraded, needs attention |
| `error` | Red | Down, failed, critical |
| `info` | Purple (accent) | Feature flags, beta labels |
| `neutral` | Muted grey | Draft, pending, inactive |

## Examples

```tsx
<Badge variant="success" dot>Active</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info" size="sm">Beta</Badge>
<Badge variant="neutral">Draft</Badge>
```

## Notes

- Dark-mode colors are defined in `Badge.css` under `@media (prefers-color-scheme: dark)`.
- The dot uses `currentColor` so it always matches the variant text color.
