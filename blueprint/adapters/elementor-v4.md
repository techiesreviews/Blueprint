# Elementor V4 Adapter

This adapter applies the builder-agnostic blueprint through Elementor V4 native features.

## Priority

1. Elementor V4 Variables.
2. Elementor V4 Global Classes.
3. Elementor V4 native controls.
4. Elementor V4 Custom CSS only when required.

## Global Setup

Add the root font-size rule in global/site CSS, not inside a Global Class:

```css
html {
  font-size: 62.5%;
}
```

## Variables

Create the Core tokens from the main blueprint in Elementor V4 Variables where supported.

Known caution:

- If OKLCH is not accepted by Elementor color controls, use project-specific fallback values.
- If a token type is not supported natively, prefer Elementor's native preset/control for that feature before using Custom CSS.
- Shadows should use Elementor native shadow controls where possible, not Custom CSS by default.

## Global Classes

Create these Global Classes:

```txt
section
container

nav
nav__inner
nav__brand
nav__menu
nav__actions

hero
hero__inner
hero__content
hero__media

footer
footer__inner
footer__nav

h1
h2
h3
h4
h5
h6
text
```

## Control Mapping

### `.section`

```txt
Native controls:
- Padding block: var(--section-space)

Custom CSS:
- None by default
```

### `.container`

```txt
Native controls:
- Max width: var(--content-width)
- Horizontal spacing/gutter: use var(--gutter) if Elementor supports it cleanly

Custom CSS:
- None by default
```

### `.h1` To `.h6`

```txt
Native controls:
- Font family: var(--font-heading)
- Font weight: var(--font-weight-heading)
- Font size: matching heading variable
- Line height: matching heading line-height variable
- Text wrap: balance, if available natively

Custom CSS:
- None by default
```

Do not add color, margin, letter-spacing, or text-transform by default.

### `.text`

```txt
Native controls:
- Font family: var(--font-text)
- Font weight: var(--font-weight-text)
- Font size: var(--text-m)
- Line height: var(--text-line-height)
- Text wrap: pretty, if available natively

Custom CSS:
- None by default
```

Do not add color, margin, letter-spacing, or text-transform by default.

### `.nav`, `.hero`, `.footer`, And Child Classes

```txt
Create classes only.
Assign layout, color, background, grid/flex, gap, and alignment per project through Elementor V4 controls.

Custom CSS:
- None by default
```

## Application Patterns

### Hero

```txt
Outer section:
- section
- hero

Inner wrapper:
- container
- hero__inner

Content wrapper:
- hero__content

Media wrapper:
- hero__media
```

### Navigation

```txt
Outer wrapper:
- nav

Inner wrapper:
- container
- nav__inner

Brand:
- nav__brand

Menu wrapper:
- nav__menu

Actions wrapper:
- nav__actions
```

### Footer

```txt
Outer footer:
- footer

Inner wrapper:
- container
- footer__inner

Footer navigation:
- footer__nav
```

## Agent Rules

```txt
Use Elementor V4 native features first.
Do not add class-level Custom CSS by default.
Do not create modifiers, utilities, button classes, or rich text classes unless the project explicitly needs them.
Keep the Core class names unchanged.
Document any Elementor limitation instead of silently adding CSS.
```

## Accessibility Adapter Notes

```txt
Use Elementor native controls for focus styles where available.
Ensure focus color, width, and offset use the Core focus tokens where possible.
Do not add accessibility utility classes by default.
Add project CSS for skip links, reduced motion, or visually hidden text only when the project needs it and Elementor cannot express it natively.
```
