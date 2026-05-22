---
name: validate-builder-blueprint
description: Validate the Builder Blueprint Core Contract, generated outputs, and adapter references.
---

# Validate Builder Blueprint

Use this skill when an agent changes the Core Contract, adapters, generated outputs, or tools.

## Workflow

1. Run `npm run generate`.
2. Run `npm run validate`.
3. Fix hard validation failures before handing work back.
4. Treat adapter completeness warnings as acceptable until that adapter has an executable workflow.

## Validation Policy

- Core contract failures are blocking.
- Stale generated outputs are blocking.
- Unknown adapter token references are blocking.
- Incomplete adapter coverage is a warning.
