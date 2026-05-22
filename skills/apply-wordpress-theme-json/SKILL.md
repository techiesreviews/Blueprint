---
name: apply-wordpress-theme-json
description: Generate and apply the Builder Blueprint WordPress theme.json reference from blueprint/core.json.
---

# Apply WordPress theme.json

Use this skill when an agent needs to generate a WordPress `theme.json` artifact from the Builder Blueprint Core Contract.

## Workflow

1. Read `blueprint/core.json`.
2. Run `npm run generate:theme-json`.
3. Validate with `npm run validate`.
4. Copy or merge `blueprint/reference/generated-theme.json` into the target WordPress theme only when the target project explicitly wants the generated artifact.

## Rules

- Keep `blueprint/core.json` as the source of truth.
- Do not edit generated `theme.json` output manually.
- Do not install this repository inside `wp-content/themes` or `wp-content/plugins`.
- Document target-theme changes in the target project, not in this source repository.
