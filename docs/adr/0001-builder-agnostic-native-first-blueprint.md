# Builder-Agnostic Native-First Blueprint

We will treat the project as a builder-agnostic Blueprint rather than an Elementor-specific setup or an external CSS framework. The Core records portable preferences for tokens, classes, architecture, and recipes, while each Adapter applies those decisions through native builder or platform features first.

## Considered Options

- Elementor-specific default asset setup.
- External CSS framework with folders for tokens, objects, components, utilities, and adapters.
- Builder-agnostic Blueprint with native-first adapters.

## Consequences

The main documentation must stay builder-neutral, and builder-specific implementation details belong in adapter docs. External CSS, cascade layers, component APIs, and richer recipes are allowed as optional project or adapter strategies, but they are not the default delivery model.
