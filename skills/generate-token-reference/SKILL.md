---
name: generate-token-reference
description: Generate the Builder Blueprint CSS token reference from blueprint/core.json.
---

# Generate Token Reference

Use this skill when an agent needs to refresh the CSS token reference output.

## Workflow

1. Read `blueprint/core.json`.
2. Run `npm run generate:tokens`.
3. Validate with `npm run validate`.

## Rules

- The generated CSS is a reference output, not the default delivery model.
- Prefer native builder variables or platform presets before using the generated CSS in a project.
- Do not edit `blueprint/reference/generated-tokens.css` manually.
