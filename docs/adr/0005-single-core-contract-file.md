# Single Core Contract File

We will use `blueprint/core.json` as the single machine-readable Core contract and remove `blueprint/source-settings.json`. Keeping two JSON sources would create drift between source settings, token definitions, class inventory, and adapter tooling.

## Consequences

Generated CSS, WordPress `theme.json`, validation, and future adapter skills should read from `blueprint/core.json`. Generated values and adapter-specific mappings should remain outputs or adapter files, not part of the Core contract.
