# WordPress theme.json First Vertical Slice

We will prove the executable Blueprint workflow by generating and validating a WordPress `theme.json` artifact from the Core contract first. WordPress `theme.json` is file-based and testable, so it is a better first adapter target than builder UIs like Elementor or Bricks.

## Considered Options

- Build all adapter workflows in parallel.
- Start with Elementor or Bricks native setup workflows.
- Start with Core contract, generated WordPress `theme.json`, and validation.

## Consequences

The first implementation should create a machine-readable Core contract, a WordPress `theme.json` generator, and validation tooling before expanding Elementor or Bricks skills beyond documentation/checklists.
