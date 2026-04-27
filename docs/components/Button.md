# Button

Reusable action trigger with 4 variants, 3 sizes, loading and icon support.

## Location

`src/components/Button/`

| File | Purpose |
|---|---|
| `Button.tsx` | Component + TypeScript types |
| `Button.css` | Scoped styles using CSS custom properties |
| `Button.stories.tsx` | Storybook stories |

## Usage

```tsx
import { Button } from '@/components'

<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding and font size |
| `loading` | `boolean` | `false` | Shows a spinner and disables the button |
| `fullWidth` | `boolean` | `false` | Stretches to fill its container |
| `leftIcon` | `ReactNode` | — | Icon rendered before the label |
| `rightIcon` | `ReactNode` | — | Icon rendered after the label |
| `disabled` | `boolean` | — | Native disabled attribute |
| `...rest` | `ButtonHTMLAttributes` | — | All standard button attributes |

## Variants

| Variant | Use case |
|---|---|
| `primary` | Main CTA, confirmations |
| `secondary` | Secondary actions, less prominent CTAs |
| `ghost` | Tertiary actions, cancel buttons |
| `danger` | Destructive actions (delete, remove) |

## Examples

```tsx
// Loading state
<Button variant="primary" loading>Saving…</Button>

// With icon
<Button variant="primary" leftIcon={<PlusIcon />}>Add Item</Button>

// Full width
<Button variant="primary" fullWidth>Submit</Button>

// Danger
<Button variant="danger" onClick={handleDelete}>Delete Account</Button>
```

## Accessibility

- Uses native `<button>` element — keyboard and screen-reader friendly by default.
- `focus-visible` outline using `var(--accent)`.
- Loading state sets `disabled` and renders `aria-label="Loading"` on the spinner.
