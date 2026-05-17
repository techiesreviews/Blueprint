# Minimal Starter Core

We will keep the Core small by default: tokens, a short set of starter classes, accessibility requirements, and adapter rules. Larger object, component, utility, theme, form, prose, and layout systems are treated as optional recipes or expansion paths rather than default Core.

## Considered Options

- Start with a broad framework-style class set such as `o-stack`, `o-grid`, `c-button`, `c-card`, `c-prose`, `u-visually-hidden`, and state classes.
- Start with short unprefixed builder-friendly classes and expand only when a project proves the need.

## Consequences

The default setup stays easier to apply in builder class interfaces and avoids becoming an external CSS framework by accident. Optional recipes and expansion naming can still be added per project when they create clear layout, component, accessibility, or content value.
