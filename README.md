# Builder Blueprint

This workspace contains a reusable builder-agnostic setup for website projects.

Start here:

- [Blueprint spec](blueprint/builder-agnostic-blueprint.md)
- [Core contract](blueprint/core.json)
- [Core token inventory](blueprint/tokens.md)
- [Generated token reference CSS](blueprint/reference/generated-tokens.css)
- [Generated WordPress theme.json reference](blueprint/reference/generated-theme.json)
- [WordPress theme.json adapter mapping](blueprint/adapters/wordpress-theme-json.json)
- [Elementor V4 adapter](blueprint/adapters/elementor-v4.md)
- [Bricks adapter](blueprint/adapters/bricks.md)
- [WordPress theme.json adapter](blueprint/adapters/wordpress-theme-json.md)
- [Target project application workflow](docs/apply-to-target-project.md)

Useful commands:

```sh
npm run generate
npm run test:generated
npm run validate
```

The setup is intentionally minimal:

- Native builder variables/tokens first.
- Native builder classes/controls second.
- Custom CSS only when a project needs something the builder cannot express cleanly.
