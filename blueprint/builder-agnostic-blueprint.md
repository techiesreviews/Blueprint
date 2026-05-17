# Builder-Agnostic Builder Blueprint

## Core Principle

This blueprint defines portable design decisions for website builds across page builders and WordPress-native workflows.

Use the builder's native features first. Use Custom CSS only when the native feature set cannot express the requirement cleanly.

This is not shipped standalone CSS by default. It is a reusable setup model for tokens, classes, architecture, and builder adapters.

## Implementation Order

1. Confirm the target builder/platform.
2. Apply global setup assumptions.
3. Create tokens through the builder's native token/variable system where possible.
4. Create reusable classes through the builder's native class system where possible.
5. Map class styles through native controls.
6. Add project-specific Custom CSS only for real gaps.
7. Document any adapter limitation or custom workaround.

## Conceptual Layers

These are architectural layers, not required folders or CSS files.

```txt
tokens
base assumptions
layout objects
semantic components
utilities
states
themes
recipes
adapters
overrides
```

The layers keep the setup teachable and portable. Each builder adapter decides how to express them natively.

## Philosophy

```txt
Tokens = decisions
Objects = layout
Components = identity
Utilities = exceptions
States = behaviour
Themes = context
Recipes = reusable composition patterns
Adapters = builder-specific implementation
Overrides = project-specific decisions
```

Golden rule:

```txt
Every reusable class should either create layout, define a component, expose a token API, or solve an accessibility problem.
```

## Global Setup

Use a 62.5% root font size:

```css
html {
  font-size: 62.5%;
}
```

All `rem` values assume:

```txt
1rem = 10px
```

This belongs in global/site CSS, theme CSS, or the target builder's global CSS entry point. It is not a component class.

## Fluid Scale Source Settings

The scale follows a ratio-based fluid model: store readable source values, generate final `rem` clamps.

```json
{
  "viewportMin": 360,
  "viewportMax": 1366,
  "rootPx": 10,

  "baseSpaceMin": 24,
  "baseSpaceMax": 30,
  "mobileSpaceScale": 1.333,
  "desktopSpaceScale": 1.5,

  "sectionSpaceMin": 48,
  "sectionSpaceMax": 90,

  "gutterMin": 16,
  "gutterMax": 80,

  "baseTextMin": 16,
  "baseTextMax": 18,
  "textScaleMin": 1.2,
  "textScaleMax": 1.333,

  "baseHeadingMin": 18,
  "baseHeadingMax": 20,
  "headingScaleMin": 1.2,
  "headingScaleMax": 1.333,
  "h1Max": 72
}
```

Clamp formula:

```txt
slope = (max - min) / (viewportMax - viewportMin) * 100
intercept = min - slope * viewportMin / 100

clamp(min, calc(intercept + slope * 1vw), max)
```

When a token decreases slightly between the mobile and desktop ratios, keep the preferred value formula and sort the clamp bounds so the CSS remains valid.

## Core Tokens

Core tokens are portable design decisions. CSS custom properties are only one possible output.

Create these through the target builder's native variable/token system where possible. See [tokens.md](tokens.md) for the token inventory and rules.

### Colors

```css
--primary: oklch(18% 0.03 260);
--secondary: oklch(46% 0.03 260);
--accent: oklch(62% 0.15 255);
--base: oklch(99% 0.003 260);
--surface: oklch(96% 0.006 260);
--shade: oklch(13% 0.02 260);
--border-color: oklch(90% 0.01 260);
--white: oklch(100% 0 0);
--black: oklch(0% 0 0);
```

If a builder does not accept OKLCH in native color fields, use fallback values in that adapter.

### Spacing And Layout

```css
--space-xs;
--space-s;
--space-m;
--space-l;
--space-xl;
--space-xxl;

--section-space;
--gutter;
--content-width: 140rem;
```

### Typography

```css
--font-heading: "Inter", system-ui, sans-serif;
--font-text: "Inter", system-ui, sans-serif;

--font-weight-heading;
--font-weight-text;

--h1;
--h1-line-height: calc(2px + 1.8ex);
--h2;
--h2-line-height: calc(3px + 1.9ex);
--h3;
--h3-line-height: calc(4px + 2ex);
--h4;
--h4-line-height: calc(4px + 2ex);
--h5;
--h5-line-height: calc(4px + 2ex);
--h6;
--h6-line-height: calc(4px + 2ex);

--text-xs;
--text-s;
--text-m;
--text-l;
--text-xl;
--text-xxl;
--text-line-height: calc(6px + 2.5ex);
```

Heading generation uses:

```txt
h6 = base heading
h5 = base heading * heading scale
h4 = base heading * heading scale^2
h3 = base heading * heading scale^3
h2 = base heading * heading scale^4
h1 = base heading * heading scale^5, capped at 72px
```

### Shape And Border

```css
--radius-xs;
--radius-s;
--radius-m;
--radius-l;
--radius-xl;

--border-width;
--border-color;
```

Radius values should be fluid clamps.

### Shadows

```css
--shadow-xs;
--shadow-s;
--shadow-m;
--shadow-l;
--shadow-xl;
```

Use native builder shadow controls where possible. Do not add shadow Custom CSS by default.

### Focus

```css
--focus-color: var(--primary);
--focus-width: 2px;
--focus-offset: 2px;
```

### Transitions

```css
--transition-duration: 0.3s;
--transition-timing: ease-in-out;
--transition-delay: 0s;
```

## Minimal Core Classes

These are the starter classes. Do not expand them until a project proves the need.

### Layout

```txt
section
container
```

### Navigation

```txt
nav
nav__inner
nav__brand
nav__menu
nav__actions
```

### Hero

```txt
hero
hero__inner
hero__content
hero__media
```

### Footer

```txt
footer
footer__inner
footer__nav
```

### Typography

```txt
h1
h2
h3
h4
h5
h6
text
```

## Naming Rules

Use shallow BEM where structure/reuse matters:

```txt
block
block__element
block--modifier
```

Avoid deep BEM:

```txt
block__element__child
block--modifier__element
```

Use objects, components, utilities, and states as conceptual categories. The minimal Core uses short unprefixed starter classes because they are easier to apply inside builder class interfaces.

Do not add prefix systems like `o-`, `c-`, `u-`, or `is-` to the minimal class list by default. Treat them as an optional expansion model if the Blueprint grows into a larger CSS system.

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

## Custom CSS Policy

Do not add Custom CSS by default.

Allowed only when:

- The builder has no native control for the needed behavior.
- A project requires container queries.
- A project requires advanced selectors.
- A project requires global setup CSS like `html { font-size: 62.5%; }`.
- A project-specific component needs behavior the builder cannot express.

Do not add scoped component variables by default, such as:

```css
--hero-bg
--hero-text
--nav-gap
--footer-bg
```

Component-scoped variables are allowed in optional recipes/components when they form a clear Component API.

Example:

```css
--card-padding
--card-radius
--card-bg
```

Do not add these to the minimal Core.

## Accessibility Requirements

Accessibility is part of the Core, but accessibility utility classes are not added by default.

Each adapter should account for:

```txt
visible focus states
skip-link support
reduced motion support
accessible hidden text pattern when needed
minimum interactive target sizing where the builder supports it
semantic state hooks such as aria-expanded where relevant
```

Prefer native builder/platform features. Add Custom CSS only when the target builder cannot satisfy the requirement cleanly.

## Optional Theme Contexts

Theme contexts are an expansion path, not part of the minimal Core.

Examples:

```txt
[data-theme="dark"]
[data-theme="brand"]
[data-theme="muted"]
```

Do not add these by default because they require a broader semantic color system, such as:

```css
--color-bg
--color-text
--color-surface
--color-border
```

Add theme contexts per project when the design needs dark sections, brand sections, muted panels, or mode switching.

## Optional Recipes

Recipes are reusable composition patterns. They are not part of the minimal Core.

Add recipes only when a project needs them.

### Prose Recipe

Use a prose recipe for:

```txt
blog posts
CMS content
ACF/WYSIWYG fields
builder text editor output
Gutenberg content
documentation pages
legal pages
```

Do not style raw HTML globally. Scope prose styling to the recipe class or the builder/platform equivalent.

Possible future names:

```txt
prose
content
rich-text
```

No canonical class name is selected by default.

### Form Recipe

Use a form recipe when a project needs consistent styling across:

```txt
native builder forms
Elementor Forms
Fluent Forms
Gravity Forms
WS Form
Contact Form 7
WooCommerce checkout
```

Keep plugin-specific selectors in adapter/project notes. Do not add form classes or generic input styling to the minimal Core by default.

Possible future class family:

```txt
form
field
field__label
field__control
field__message
field--error
```

No canonical form class family is selected by default.

### Layout Recipes

Use layout recipes only when native builder layout controls are not enough or a repeated pattern needs a stable name.

Possible future layout recipes:

```txt
stack
grid
cluster
sidebar
flow
switcher
cover
frame
reel
```

Do not add these by default. In builders like Elementor and Bricks, flex, grid, gap, alignment, and responsive behavior should usually be handled through native controls first.

## Optional CSS Architecture Notes

These notes apply only when a project or adapter ships Custom CSS or external CSS. They are not required for native-builder implementations.

### Cascade Layers

When a project has enough CSS to need predictable ordering, use cascade layers.

Suggested order:

```css
@layer reset, tokens, base, wordpress, builders, objects, components, utilities, overrides;
```

Use this as a CSS architecture guardrail, not as a default builder setup requirement.

### Low Specificity

When writing reusable project CSS, prefer `:where()` for low-specificity defaults:

```css
:where(.card) {
  border-radius: var(--radius-m);
}
```

Use regular class specificity only when the rule is intentionally meant to carry more weight.

## Do Not Add By Default

Do not include by default:

```txt
button classes
rich-text/content/prose classes
form classes
spacing utility classes
layout object classes
accessibility utility classes
theme context attributes
color tint/shade scales
contrast text variables
link color variables
opacity variables
breakpoint variables
z-index variables
global HTML element styling
component-scoped CSS variables
default class-level Custom CSS
nav item/link classes
footer legal classes
container width variants
modifiers like hero--dark or nav--sticky
external CSS folder structure
```

## AI / Agent Rules

```txt
Prefer native builder variables, presets, controls, and class systems.

Create only the variables and classes listed in the blueprint unless the current project explicitly expands the system.

Apply styles through native builder controls wherever possible.

Do not add Custom CSS to classes unless the blueprint or current project explicitly requires it.

Do not invent utility classes, modifiers, button classes, rich-text classes, or extra component classes by default.

Use exact class names.

Do not style raw HTML elements globally.

Do not add color, margin, letter-spacing, or text-transform to typography classes by default.

Use container queries only as project-specific solutions, not as default class CSS.

When the builder cannot represent a variable type natively, document the limitation and prefer native presets/settings before using Custom CSS.
```
