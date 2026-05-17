# Builder-Agnostic Builder Blueprint

This workspace contains a reusable builder-agnostic setup for website projects.

Start here:

- [Blueprint spec](blueprint/builder-agnostic-blueprint.md)
- [Core token inventory](blueprint/tokens.md)
- [Source settings](blueprint/source-settings.json)
- [Generated token reference CSS](blueprint/reference/generated-tokens.css)
- [Elementor V4 adapter](blueprint/adapters/elementor-v4.md)
- [Bricks adapter](blueprint/adapters/bricks.md)
- [WordPress theme.json adapter](blueprint/adapters/wordpress-theme-json.md)

The setup is intentionally minimal:

- Native builder variables/tokens first.
- Native builder classes/controls second.
- Custom CSS only when a project needs something the builder cannot express cleanly.
