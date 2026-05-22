# Repo Structure For Agentic Workflows

We will structure the repository around `blueprint/`, `skills/`, and `tools/`. The `blueprint/` directory holds the contract and documentation, `skills/` holds repeatable agent workflows, and `tools/` holds executable helpers used by those workflows.

## Considered Options

- Keep the repository as documentation plus adapter notes only.
- Replace the Blueprint with skills.
- Separate the Blueprint contract, agent workflows, and executable helpers into explicit directories.

## Consequences

The repository stays useful as an agentic source of truth without turning skills into the canonical contract. Future work should add generated outputs and validation through `tools/`, then expose those routines through focused `skills/`.
