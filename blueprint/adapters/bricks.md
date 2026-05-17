# Bricks Adapter

This adapter applies the builder-agnostic blueprint through Bricks native features.

## Priority

1. Bricks theme styles and variables where available.
2. Bricks classes.
3. Bricks native controls.
4. Custom CSS only when required.

## Mapping Principle

Use the Core tokens and minimal classes from the main blueprint, but express them through Bricks-native mechanisms wherever possible.

Do not treat the generated token CSS as the default delivery model.

## Initial Tasks

```txt
- Map Core tokens to Bricks variables/theme styles.
- Create the minimal Core classes in Bricks.
- Apply section, container, heading, and text defaults through native controls.
- Account for focus states, skip links, reduced motion, and accessible hidden text through Bricks/native project setup where needed.
- Document any Bricks-specific limitation before adding Custom CSS.
```
