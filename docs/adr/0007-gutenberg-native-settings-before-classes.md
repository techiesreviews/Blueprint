# Gutenberg Native Settings Before Classes

The WordPress `theme.json` adapter will prefer WordPress core block editor settings, presets, styles, and block variations before adding reusable classes when the selected target workflow is WordPress Gutenberg. This adapter-specific decision does not apply to Elementor, Bricks, or plain HTML/CSS projects, which should use their own best native workflow and settings.

## Consequences

The WordPress `theme.json` adapter should generate native settings and per-block styles where practical. Classes remain useful for non-Gutenberg builders and for project-specific gaps, but they are not the first styling mechanism for Gutenberg-native builds.
