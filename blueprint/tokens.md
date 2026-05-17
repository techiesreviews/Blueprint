# Core Tokens

Core tokens are portable design decisions. CSS custom properties are only one possible output.

A builder adapter may store the same tokens as:

```txt
Elementor V4 Variables
Bricks variables/theme styles
WordPress theme.json presets
plain CSS custom properties
project-specific design token exports
```

Use native builder/platform token systems first. Use the generated CSS reference only when CSS is the chosen or necessary output.

## Source Of Truth

Source settings live in [source-settings.json](source-settings.json).

Generated CSS reference values live in [generated-tokens.css](reference/generated-tokens.css).

## Naming

Token names intentionally follow an ACSS-inspired style:

```txt
--primary
--space-m
--section-space
--text-m
--h1
--radius-m
```

Do not rename tokens to verbose names like `--color-primary` or `--layout-container-max` by default.

## Color Tokens

```css
--primary
--secondary
--accent
--base
--surface
--shade
--border-color
--white
--black
```

Default roles:

```txt
--primary: dark brand/action color
--secondary: muted support color
--accent: restrained highlight/accent color
--base: main light background
--surface: subtle raised or grouped surface
--shade: main dark text/surface
--border-color: default neutral border
--white: absolute white
--black: absolute black
```

The default palette is near-monochrome, accessible-oriented, and OKLCH-first. If a builder does not accept OKLCH in native color controls, choose fallback values in the adapter or project.

Do not add these by default:

```txt
color tint/shade scales
contrast text variables
link color variables
opacity variables
theme context tokens
```

## Spacing And Layout Tokens

```css
--space-xs
--space-s
--space-m
--space-l
--space-xl
--space-xxl
--section-space
--gutter
--content-width
```

Spacing uses an ACSS-style fluid scale with:

```txt
mobile base space: 24px
desktop base space: 30px
mobile ratio: 1.333
desktop ratio: 1.5
```

`--section-space` is a single Core token, not a section t-shirt scale.

`--content-width` defaults to `140rem`, assuming a 62.5% root font size.

Do not add these by default:

```txt
spacing utility classes
content width variants
breakpoint variables
```

## Typography Tokens

```css
--font-heading
--font-text
--font-weight-heading
--font-weight-text

--h1
--h1-line-height
--h2
--h2-line-height
--h3
--h3-line-height
--h4
--h4-line-height
--h5
--h5-line-height
--h6
--h6-line-height

--text-xs
--text-s
--text-m
--text-l
--text-xl
--text-xxl
--text-line-height
```

Heading sizes use the ACSS-style heading scale:

```txt
h6 = base heading
h5 = base heading * heading scale
h4 = base heading * heading scale^2
h3 = base heading * heading scale^3
h2 = base heading * heading scale^4
h1 = base heading * heading scale^5, capped at 72px
```

Heading line heights are paired and tighter for larger headings:

```css
--h1-line-height: calc(2px + 1.8ex);
--h2-line-height: calc(3px + 1.9ex);
--h3-line-height: calc(4px + 2ex);
--h4-line-height: calc(4px + 2ex);
--h5-line-height: calc(4px + 2ex);
--h6-line-height: calc(4px + 2ex);
```

Text uses:

```css
--text-line-height: calc(6px + 2.5ex);
```

Do not add these by default:

```txt
letter-spacing tokens
text color tokens
font-weight scale
global HTML element styling
```

## Shape And Border Tokens

```css
--radius-xs
--radius-s
--radius-m
--radius-l
--radius-xl
--border-width
--border-color
```

Radius values are fluid clamp values.

Borders stay simple by default:

```txt
one border width
one border color
```

## Shadow Tokens

```css
--shadow-xs
--shadow-s
--shadow-m
--shadow-l
--shadow-xl
```

Prefer native builder shadow controls when available. Do not add shadow Custom CSS by default.

## Focus Tokens

```css
--focus-color
--focus-width
--focus-offset
```

Focus is a Core accessibility concern. Each adapter should map these tokens through native features where possible.

## Transition Tokens

```css
--transition-duration
--transition-timing
--transition-delay
```

Transition tokens exist for native controls and project-specific use. They do not imply default hover styles or component CSS.

## Output Rule

Do not assume Core tokens must become CSS custom properties.

Correct:

```txt
Core token -> builder native variable/preset/control
Core token -> WordPress theme.json preset
Core token -> CSS custom property when CSS output is needed
```

Incorrect:

```txt
Core token -> external CSS file by default
```

