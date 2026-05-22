# WordPress theme.json Adapter

This adapter maps the builder-agnostic blueprint to WordPress global styles and `theme.json` where useful.

Machine-readable mapping lives in [wordpress-theme-json.json](wordpress-theme-json.json).

Reference output lives in [generated-theme.json](../reference/generated-theme.json). Generate it from the Core Contract with:

```sh
npm run generate:theme-json
```

## Priority

1. `theme.json` settings and presets.
2. WordPress core block settings, styles, elements, and variations.
3. WordPress templates, template parts, patterns, and Site Editor global styles.
4. Custom CSS only when required.

## Mapping Principle

Use WordPress presets as an adapter surface for Core tokens.

When the target project is Gutenberg-native, use WordPress core block settings and block-specific styles/variations before classes. This rule is scoped to the WordPress Gutenberg workflow; Elementor, Bricks, and plain HTML/CSS should use their own best native workflow and settings.

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
- Keep color tokens mapped to theme.json palette presets.
- Keep text tokens mapped to theme.json fontSizes where practical.
- Keep spacing tokens mapped to theme.json spacing presets where practical.
- Keep layout mapped to theme.json layout contentSize, wideSize, and root padding behavior.
- Keep repeated Gutenberg block treatments in styles.blocks or block variations before adding classes.
- Account for focus styles, skip links, reduced motion, and accessible hidden text through theme/global styles where needed.
- Keep component/class mapping in builder adapters, not theme.json by default.
```

## Reference Themes Checked

Twenty Twenty-Five uses `theme.json` as the primary styling surface, enables broad editor controls with `appearanceTools`, defines layout widths, presets, root-padding-aware alignments, element styles, per-block styles, and block variations while aiming to ship very little CSS.

Ollie follows a production block-theme structure with `theme.json` for global settings/styles, `styles/` for style variations and presets, `patterns/`, `parts/`, and `templates/`.
