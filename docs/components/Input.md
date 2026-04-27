# Input

Accessible text input with label, hint, error, and icon slots.

## Location

`src/components/Input/`

| File | Purpose |
|---|---|
| `Input.tsx` | Component + TypeScript types |
| `Input.css` | Scoped styles |
| `Input.stories.tsx` | Storybook stories |

## Usage

```tsx
import { Input } from '@/components'

<Input
  label="Email"
  placeholder="you@example.com"
  type="email"
  hint="We'll never share your email."
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text rendered above the input |
| `error` | `string` | — | Error message — shown below, overrides hint; adds red border |
| `hint` | `string` | — | Helper text shown below the input |
| `leftIcon` | `ReactNode` | — | Icon inside the left side of the input |
| `rightIcon` | `ReactNode` | — | Icon inside the right side of the input |
| `id` | `string` | auto | Explicit `id`; auto-generated via `useId` if omitted |
| `...rest` | `InputHTMLAttributes` | — | All standard `<input>` attributes |

## States

| State | How to trigger |
|---|---|
| Default | Normal |
| Focus | Click / Tab — shows accent ring |
| Error | Pass `error` prop |
| Disabled | Pass `disabled` attribute |

## Examples

```tsx
// Controlled input
const [val, setVal] = useState('')
<Input
  label="Username"
  value={val}
  onChange={(e) => setVal(e.target.value)}
  hint="Letters, numbers, underscores only."
/>

// Error state
<Input
  label="Password"
  type="password"
  error="Too short — minimum 8 characters."
/>

// With icon
<Input
  label="Search"
  placeholder="Search events…"
  leftIcon={<SearchIcon />}
/>
```

## Accessibility

- `htmlFor` on `<label>` is wired to the input `id` (auto-generated with `useId`).
- `aria-invalid` is set when `error` is present.
- `aria-describedby` links the input to the active error or hint message.
