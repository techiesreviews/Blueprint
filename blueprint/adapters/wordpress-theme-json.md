# WordPress theme.json Adapter

This adapter maps the builder-agnostic blueprint to WordPress global styles and `theme.json` where useful.

## Priority

1. `theme.json` settings and presets.
2. WordPress global styles.
3. Block style variations where appropriate.
4. Custom CSS only when required.

## Mapping Principle

Use WordPress presets as an adapter surface for Core tokens.

Example direction:

```css
:root {
  --primary: var(--wp--preset--color--primary, oklch(18% 0.03 260));
  --space-m: var(--wp--preset--spacing--40, 2.4rem);
  --text-m: var(--wp--preset--font-size--medium, 1.6rem);
}
```

This keeps the blueprint portable:

```txt
works in WordPress
works outside WordPress
uses WP presets when available
keeps fallbacks when unavailable
```

## Initial Tasks

```txt
- Map color tokens to theme.json palette presets.
- Map text tokens to theme.json fontSizes where practical.
- Map spacing tokens to theme.json spacing presets where practical.
- Account for focus styles, skip links, reduced motion, and accessible hidden text through theme/global styles where needed.
- Keep component/class mapping in builder adapters, not theme.json by default.
```
