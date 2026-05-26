# Netflix-Inspired UI Design System

This document defines the complete design system used in the Netflix-inspired application, including color palettes, typography, spacing, and dark/light mode implementation.

---

## Overview

The design system follows Netflix's signature dark-first aesthetic while providing a clean light mode alternative. All design tokens are defined as CSS variables in `src/index.css` and consumed by Tailwind CSS utilities.

---

## Color Palette

### Primary Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--netflix-red` | `#e50914` | Brand color, CTAs, accents |
| `--netflix-red-hover` | `#f40612` | Hover state for primary actions |
| `--netflix-red-dark` | `#b20710` | Pressed/depressed state |

### Light Mode Colors

**Backgrounds**
- `--background-primary`: `#ffffff` - Main background
- `--background-secondary`: `#f5f5f5` - Secondary backgrounds
- `--background-tertiary`: `#e5e5e5` - Tertiary backgrounds

**Text**
- `--text-primary`: `#141414` - Primary text
- `--text-secondary`: `#4d4d4d` - Secondary text
- `--text-muted`: `#808080` - Muted/disabled text
- `--text-inverse`: `#ffffff` - Inverse text (on dark backgrounds)

**UI Elements**
- `--card-background`: `#ffffff` - Card backgrounds
- `--card-border`: `#e5e5e5` - Card borders
- `--separator`: `#e5e5e5` - Dividers/separators

**Interactive States**
- `--hover-overlay`: `rgba(0, 0, 0, 0.05)` - Hover overlay
- `--active-overlay`: `rgba(0, 0, 0, 0.1)` - Active/pressed state
- `--focus-ring`: `rgba(229, 9, 20, 0.4)` - Focus ring color

**Buttons**
- `--button-primary-bg`: `#e50914` - Primary button background
- `--button-primary-text`: `#ffffff` - Primary button text
- `--button-primary-hover`: `#f40612` - Primary button hover
- `--button-secondary-bg`: `rgba(255, 255, 255, 0.7)` - Secondary button background
- `--button-secondary-text`: `#141414` - Secondary button text
- `--button-secondary-hover`: `rgba(255, 255, 255, 0.9)` - Secondary button hover

**Header/Navigation**
- `--header-bg`: `transparent` - Default header background
- `--header-bg-scrolled`: `#141414` - Scrolled header background
- `--header-text`: `#141414` - Header text color

**Content Cards**
- `--content-card-bg`: `#ffffff` - Content card background
- `--content-card-shadow`: `rgba(0, 0, 0, 0.1)` - Content card shadow

**Input Fields**
- `--input-bg`: `#ffffff` - Input background
- `--input-border`: `#8c8c8c` - Input border
- `--input-focus-border`: `#141414` - Input focus border

**Status Colors**
- `--success`: `#46d369` - Success state
- `--warning`: `#f5c518` - Warning state
- `--error`: `#e50914` - Error state
- `--info`: `#0071eb` - Info state

### Dark Mode Colors

**Backgrounds**
- `--background-primary`: `black` - Main background
- `--background-secondary`: `#181818` - Secondary backgrounds
- `--background-tertiary`: `#1f1f1f` - Tertiary backgrounds

**Text**
- `--text-primary`: `#ffffff` - Primary text
- `--text-secondary`: `#b3b3b3` - Secondary text
- `--text-muted`: `#808080` - Muted/disabled text
- `--text-inverse`: `#141414` - Inverse text (on light backgrounds)

**UI Elements**
- `--card-background`: `#181818` - Card backgrounds
- `--card-border`: `#404040` - Card borders
- `--separator`: `#404040` - Dividers/separators

**Interactive States**
- `--hover-overlay`: `rgba(255, 255, 255, 0.1)` - Hover overlay
- `--active-overlay`: `rgba(255, 255, 255, 0.15)` - Active/pressed state
- `--focus-ring`: `rgba(229, 9, 20, 0.6)` - Focus ring color

**Buttons**
- `--button-primary-bg`: `#e50914` - Primary button background (same as light)
- `--button-primary-text`: `#ffffff` - Primary button text
- `--button-primary-hover`: `#f40612` - Primary button hover
- `--button-secondary-bg`: `rgba(255, 255, 255, 0.2)` - Secondary button background
- `--button-secondary-text`: `#ffffff` - Secondary button text
- `--button-secondary-hover`: `rgba(255, 255, 255, 0.3)` - Secondary button hover

**Header/Navigation**
- `--header-bg`: `transparent` - Default header background
- `--header-bg-scrolled`: `#141414` - Scrolled header background
- `--header-text`: `#ffffff` - Header text color

**Content Cards**
- `--content-card-bg`: `#181818` - Content card background
- `--content-card-shadow`: `rgba(0, 0, 0, 0.5)` - Content card shadow

**Input Fields**
- `--input-bg`: `#1f1f1f` - Input background
- `--input-border`: `#404040` - Input border
- `--input-focus-border`: `#ffffff` - Input focus border

**Status Colors** (Same as light mode)
- `--success`: `#46d369` - Success state
- `--warning`: `#f5c518` - Warning state
- `--error`: `#e50914` - Error state
- `--info`: `#0071eb` - Info state

---

## Typography Scale

The application uses the default system font stack through Tailwind CSS. Font sizes are managed via Tailwind's utility classes:

| Tailwind Class | Size | Usage |
|---------------|------|-------|
| `text-xs` | 0.75rem | Small labels, captions |
| `text-sm` | 0.875rem | Secondary text, metadata |
| `text-base` | 1rem | Body text, default |
| `text-lg` | 1.125rem | Emphasized text |
| `text-xl` | 1.25rem | Section headings |
| `text-2xl` | 1.5rem | Page headings |
| `text-3xl` | 1.875rem | Large headings |
| `text-4xl` | 2.25rem | Hero headings |

**Font Weights**
- `font-normal` (400) - Body text
- `font-medium` (500) - Emphasized text
- `font-semibold` (600) - Headings, buttons
- `font-bold` (700) - Strong emphasis

---

## Spacing System

Spacing follows Tailwind's default scale using rem units:

| Tailwind Class | Value | Usage |
|---------------|-------|-------|
| `p-1`, `m-1` | 0.25rem | Micro spacing |
| `p-2`, `m-2` | 0.5rem | Small spacing |
| `p-3`, `m-3` | 0.75rem | Default spacing |
| `p-4`, `m-4` | 1rem | Standard spacing |
| `p-6`, `m-6` | 1.5rem | Medium spacing |
| `p-8`, `m-8` | 2rem | Large spacing |
| `p-12`, `m-12` | 3rem | Extra large spacing |

---

## Border Radius

The design system uses a consistent border radius scale defined via CSS variables:

| Variable | Value | Tailwind Class | Usage |
|----------|-------|----------------|-------|
| `--radius` | `0.625rem` | `radius-lg` | Default radius |
| `--radius-sm` | `calc(var(--radius) - 4px)` | `radius-sm` | Small elements |
| `--radius-md` | `calc(var(--radius) - 2px)` | `radius-md` | Medium elements |
| `--radius-xl` | `calc(var(--radius) + 4px)` | `radius-xl` | Large elements |
| `--radius-2xl` | `calc(var(--radius) + 8px)` | `radius-2xl` | Extra large elements |

---

## Shadow System

Shadows are defined using CSS variables and applied via Tailwind utilities:

| Variable | Value | Usage |
|----------|-------|-------|
| `--content-card-shadow` | `rgba(0, 0, 0, 0.1)` (light) / `rgba(0, 0, 0, 0.5)` (dark) | Content cards |
| `--focus-ring` | `rgba(229, 9, 20, 0.4)` (light) / `rgba(229, 9, 20, 0.6)` (dark) | Focus states |

---

## Layout Constraints

### Container

The application uses a responsive container with a maximum width of `1850px`:

```css
.container {
  margin: 0 auto;
  max-width: 1850px;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
}
```

**Responsive Padding**
- Mobile: `16px` (default)
- Tablet (md): `24px`
- Large screens (1980px+): `16px`

---

## Button Styles

### Primary Button

- **Background**: `--button-primary-bg` (Netflix red)
- **Text**: `--button-primary-text` (white)
- **Border Radius**: `4px`
- **Padding**: `0.75rem 1.5rem`
- **Font Weight**: `600`
- **Hover**: `--button-primary-hover`
- **Active**: Scale transform `0.98`

### Secondary Button

- **Background**: `--button-secondary-bg` (semi-transparent)
- **Text**: `--button-secondary-text`
- **Border**: `1px solid var(--card-border)`
- **Border Radius**: `4px`
- **Padding**: `0.75rem 1.5rem`
- **Font Weight**: `600`
- **Hover**: `--button-secondary-hover`

---

## Card Styles

### Content Card

- **Background**: `--content-card-bg`
- **Border**: `1px solid var(--card-border)`
- **Border Radius**: `4px`
- **Shadow**: `0 2px 8px var(--content-card-shadow)`
- **Hover Effect**: Scale `1.05`, enhanced shadow
- **Transition**: `transform 0.3s ease, box-shadow 0.3s ease`

---

## Dark Mode vs Light Mode Differences

### Key Differences

1. **Background Colors**
   - Light: White/light gray backgrounds
   - Dark: Black/dark gray backgrounds (Netflix signature style)

2. **Text Colors**
   - Light: Dark text on light backgrounds
   - Dark: Light text on dark backgrounds

3. **Card Styling**
   - Light: White cards with subtle shadows
   - Dark: Dark gray cards with deeper shadows

4. **Interactive States**
   - Light: Dark overlays for hover states
   - Dark: Light overlays for hover states

5. **Input Fields**
   - Light: White backgrounds with gray borders
   - Dark: Dark backgrounds with lighter borders

### Consistent Elements

- **Netflix Red**: Same across both modes for brand consistency
- **Status Colors**: Same across both modes
- **Spacing**: Identical across both modes
- **Typography**: Identical across both modes

---

## UI Behavior Rules

### Hover States

- **Buttons**: Background color change with smooth transition
- **Cards**: Scale transform with enhanced shadow
- **Links**: Color change with underline (if applicable)
- **Interactive Elements**: Visual feedback within `200ms`

### Focus States

- **Focus Ring**: `0 0 0 2px var(--focus-ring)`
- **Outline**: Removed for custom focus ring
- **Accessibility**: Always visible on keyboard navigation

### Transitions

- **Color Transitions**: `0.3s ease`
- **Transform Transitions**: `0.3s ease`
- **Background Transitions**: `0.3s ease`
- **No Layout Shift**: Theme changes should not cause layout shifts

### Scroll Behavior

- **Smooth Scrolling**: Enabled on `html` element
- **Scrollbar Styling**: Custom thin scrollbar with Netflix red accent
- **Scrollbar Width**: `6px` (horizontal and vertical)

---

## Theme Implementation

### Theme System Architecture

The application uses `next-themes` for theme management with the following configuration:

- **Storage**: `localStorage`
- **Default Theme**: `dark` (Netflix-inspired default)
- **System Preference**: Enabled as fallback
- **Attribute**: `class` (applies `.dark` class to `html` element)
- **No Flickering**: Prevents flash of incorrect theme on load

### Theme Toggle

Located in the header navigation bar, the theme toggle:
- Shows Sun icon in dark mode (switch to light)
- Shows Moon icon in light mode (switch to dark)
- Respects system preference as fallback
- Persists user choice in localStorage
- Prevents hydration mismatch with mounted state check

### CSS Variables Strategy

All design tokens are defined as CSS variables in `src/index.css`:
- Light mode variables in `:root`
- Dark mode variables in `.dark` class
- Tailwind consumes these variables via `@theme inline` directive
- Single source of truth for all design values

---

## Usage Guidelines

### Using Design Tokens in Components

**CSS Variables**
```css
.my-component {
  background-color: var(--background-primary);
  color: var(--text-primary);
  border: 1px solid var(--card-border);
}
```

**Tailwind Utilities**
```tsx
<div className="bg-background text-foreground border-border">
  Content
</div>
```

### Dark Mode Tailwind Classes

```tsx
<div className="bg-background dark:bg-card">
  This uses different backgrounds in light/dark mode
</div>
```

### Theme-Aware Components

```tsx
import { useTheme } from "next-themes";

function MyComponent() {
  const { theme } = useTheme();
  // theme will be 'light', 'dark', or 'system'
}
```

---

## Best Practices

1. **Always use CSS variables** for colors, spacing, and other design tokens
2. **Never hardcode colors** in components
3. **Test in both themes** to ensure contrast and readability
4. **Use semantic color names** (e.g., `--text-primary` instead of `--black`)
5. **Maintain consistency** with Netflix's design language
6. **Ensure accessibility** with proper color contrast ratios
7. **Prefer dark mode** as the default experience (Netflix-inspired)
8. **Keep transitions smooth** but performant
9. **Avoid layout shifts** during theme changes
10. **Test on system preference** to ensure fallback works correctly

---

## File Structure

```
src/
├── index.css                    # All CSS variables and design tokens
├── components/
│   └── shared/
│       ├── ThemeProvider.tsx     # next-themes wrapper
│       └── ThemeToggle.tsx      # Theme toggle button
├── layout/
│   └── header/
│       └── Header.tsx           # Header with theme toggle
└── App.tsx                      # App with ThemeProvider wrapper
```

---

## Dependencies

- **next-themes**: Theme management and persistence
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: Component library with theme support
- **lucide-react**: Icon library (Sun, Moon for theme toggle)

---

## Future Enhancements

Potential improvements to the design system:

1. **Animation tokens**: Define consistent animation durations and easing
2. **Breakpoint tokens**: Define custom breakpoints as CSS variables
3. **Z-index scale**: Standardized z-index values
4. **More color palettes**: Additional semantic color sets
5. **Component variants**: Pre-defined component style variants
6. **Design tokens export**: Export tokens for design tools

---

## Maintenance

When updating the design system:

1. **Update CSS variables** in `src/index.css`
2. **Test in both themes** to ensure consistency
3. **Update this document** to reflect changes
4. **Communicate changes** to the development team
5. **Version the design system** for major changes

---

This design system ensures consistency, maintainability, and scalability across the Netflix-inspired application while providing a seamless dark/light mode experience.
