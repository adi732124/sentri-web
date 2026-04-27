# Storybook

Interactive component browser for developing and documenting UI in isolation.

## Running Storybook

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006).

## Building Storybook

```bash
npm run build-storybook
```

Outputs a static site to `storybook-static/`.

## Configuration

| File | Purpose |
|---|---|
| `.storybook/main.ts` | Framework, addons, and story glob |
| `.storybook/preview.ts` | Global decorators, parameters, and CSS imports |

### `main.ts`

```ts
framework: '@storybook/react-vite'   // Uses the project's existing Vite config
stories:   'src/**/*.stories.tsx'    // Auto-discovers all story files
```

### Addons

| Addon | What it adds |
|---|---|
| `addon-essentials` | Controls, Actions, Viewport, Backgrounds, Docs |
| `addon-interactions` | Step-by-step interaction testing with `play` functions |
| `addon-a11y` | Accessibility audit panel (WCAG violations) |

## Writing Stories

Each component has a co-located `.stories.tsx` file:

```
src/components/Button/
  Button.tsx
  Button.css
  Button.stories.tsx   ← stories here
```

### Story file structure

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',   // Sidebar path
  component: Button,
  tags: ['autodocs'],           // Auto-generate Docs page
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Click me', variant: 'primary' },
}
```

### `argTypes`

Use `argTypes` in `meta` to make props interactive in the Controls panel:

```ts
argTypes: {
  variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
  loading:  { control: 'boolean' },
}
```

## Available Stories

| Component | Stories |
|---|---|
| Button | Primary, Secondary, Ghost, Danger, Small, Large, Loading, Disabled, FullWidth, WithIcon, AllVariants |
| Card | Default, WithShadow, WithFooter, WithBadge, BodyOnly |
| Badge | Success, Warning, Error, Info, Neutral, WithDot, Small, AllVariants |
| Input | Default, WithHint, WithError, Disabled, WithLeftIcon, NoLabel |
| Avatar | WithInitials, WithImage, Online, Busy, Away, Offline, AllSizes, AllStatuses |
