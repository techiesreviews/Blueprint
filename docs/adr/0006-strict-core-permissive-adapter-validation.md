# Strict Core, Permissive Adapter Validation

Validation will be strict for the Core contract and drift between generated artifacts, but permissive for adapter completeness. The Core must remain trustworthy immediately, while adapters can document limitations, partial mappings, and native-builder gaps as they mature.

## Consequences

Validation should fail on invalid `blueprint/core.json`, malformed or duplicated token/class names, stale generated outputs, and adapter references to unknown Core tokens or classes. Validation should warn, not fail, when an adapter has incomplete mappings, documented native limitations, or checklist-only accessibility coverage.
