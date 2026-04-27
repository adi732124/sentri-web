# Card

Composable container with optional header, body, and footer slots.

## Location

`src/components/Card/`

| File | Purpose |
|---|---|
| `Card.tsx` | Component + TypeScript types |
| `Card.css` | Scoped styles |
| `Card.stories.tsx` | Storybook stories |

## Usage

```tsx
import { Card } from '@/components'

<Card
  title="Card Title"
  description="Short description."
  footer={<Button size="sm">Action</Button>}
>
  Body content goes here.
</Card>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Renders a heading in the card header |
| `description` | `string` | — | Subtitle text below the title |
| `children` | `ReactNode` | — | Main body content |
| `footer` | `ReactNode` | — | Footer slot — rendered with a top border |
| `bordered` | `boolean` | `true` | Adds a `1px` border |
| `shadow` | `boolean` | `false` | Adds a box shadow for elevation |
| `className` | `string` | `''` | Additional CSS classes |

## Slots

| Slot | CSS class | Notes |
|---|---|---|
| Header | `.card__header` | Rendered when `title` or `description` is provided |
| Body | `.card__body` | Rendered when `children` is provided |
| Footer | `.card__footer` | Rendered when `footer` prop is provided; has a top border |

## Examples

```tsx
// Minimal
<Card>Plain body content.</Card>

// With all slots
<Card
  title="Confirm Delete"
  description="This cannot be undone."
  footer={
    <>
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button variant="danger" size="sm">Delete</Button>
    </>
  }
>
  All associated records will be permanently removed.
</Card>

// Elevated, no border
<Card shadow bordered={false} title="Metric">
  1,284 events today
</Card>
```
