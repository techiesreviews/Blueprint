# Builder-Agnostic Builder Blueprint

A reusable website-building blueprint that defines portable design decisions while preferring each builder's native features over shipped standalone CSS.

## Language

**Blueprint**:
A reusable setup specification for tokens, classes, builder mappings, and project rules.
_Avoid_: theme, library

**Core**:
The builder-agnostic decisions that should stay portable across tools.
_Avoid_: Elementor setup, Bricks setup

**Adapter**:
A builder-specific mapping that applies the Core through native controls, presets, theme settings, or supported CSS entry points.
_Avoid_: Separate system, fork

**Native Feature**:
A capability provided directly by a builder or platform, such as Elementor Variables, Bricks classes, or WordPress `theme.json`.
_Avoid_: Custom CSS fallback

**External CSS**:
A standalone CSS file shipped and loaded as reusable project code.
_Avoid_: Default implementation

**Custom CSS**:
Builder or project CSS used only when a Native Feature cannot express the required behavior cleanly.
_Avoid_: Primary styling layer

**Conceptual Layer**:
An architectural category such as tokens, objects, components, utilities, states, themes, recipes, adapters, or overrides that does not imply a physical file structure.
_Avoid_: Required CSS folder

**Portable Preference**:
A durable styling or architecture rule that can be applied across builders through different native mechanisms.
_Avoid_: Builder-specific workaround

**Starter Class**:
A short, unprefixed class in the minimal Core intended to be easy to apply inside builder class interfaces.
_Avoid_: Required object/component/utility prefix

**Expansion Naming**:
An optional future naming model using prefixes such as `o-`, `c-`, `u-`, or `is-` when the Blueprint grows beyond the minimal Core.
_Avoid_: Default naming

**Accessibility Requirement**:
A required usability and compliance concern that each Adapter must satisfy through native features or minimal project CSS.
_Avoid_: Optional utility class

**Theme Context**:
An optional project-level context such as dark, brand, or muted that swaps semantic tokens for a subtree.
_Avoid_: Default Core requirement

**Recipe**:
An optional reusable composition pattern added when a project needs a specific content or layout pattern.
_Avoid_: Core class

**Prose Recipe**:
An optional Recipe for CMS, blog, WYSIWYG, or long-form content styling.
_Avoid_: Global element styling

**Form Recipe**:
An optional Recipe for form styling across native builder forms and WordPress form plugins.
_Avoid_: Default Core form layer

**Layout Recipe**:
An optional Recipe for repeated layout behavior such as stack, grid, cluster, sidebar, or flow.
_Avoid_: Default layout object class

**CSS Architecture Note**:
A documented pattern for projects that ship CSS, without making that pattern mandatory for native-builder implementations.
_Avoid_: Core requirement

**Component API**:
An optional set of component-scoped custom properties that make a reusable recipe or component configurable.
_Avoid_: Minimal Core token

## Relationships

- The **Core** defines decisions once and can have many **Adapters**.
- An **Adapter** applies the **Core** through one builder or platform.
- A **Native Feature** is preferred before **Custom CSS**.
- **External CSS** is not the default delivery model for the **Blueprint**.
- A **Conceptual Layer** organizes the **Core** without requiring matching files.
- A **Portable Preference** should survive switching from one builder to another.
- **Starter Classes** are canonical for the minimal **Core**.
- **Expansion Naming** can be adopted later without changing the current minimal **Core**.
- An **Accessibility Requirement** belongs in the **Core**, but its implementation belongs in each **Adapter**.
- A **Theme Context** is an expansion path and should not be created before a project needs it.
- A **Recipe** extends the **Core** for real project needs.
- A **Prose Recipe** is used for long-form content but is not part of the minimal **Core**.
- A **Form Recipe** is plugin- and builder-sensitive, so it belongs in adapters or projects.
- A **Layout Recipe** is added only when native builder layout controls are not enough or a repeated pattern needs a stable name.
- A **CSS Architecture Note** preserves useful CSS strategy without forcing it into adapters that do not need shipped CSS.
- A **Component API** is allowed in optional recipes/components but not in the minimal **Core**.

## Example Dialogue

> **Dev:** "Should we create a CSS folder with objects, components, and utilities?"
> **Domain expert:** "No. The **Core** can use those concepts, but each **Adapter** should apply them through the builder's **Native Features** where possible."

> **Dev:** "What if we move from Elementor to Bricks later?"
> **Domain expert:** "The **Portable Preferences** stay the same; only the **Adapter** changes."

## Flagged Ambiguities

- "Elementor V4 blueprint" was too narrow. Resolved: the canonical concept is a builder-agnostic **Blueprint**, with Elementor V4 as one **Adapter**.
- "Framework" can imply a shipped CSS package. Resolved: use **Blueprint** for the reusable setup and reserve **External CSS** for optional project-specific delivery.
- Prefix naming such as `o-container` and `c-section` is useful for larger systems but conflicts with the current builder-native minimal setup. Resolved: use **Starter Classes** by default and treat prefixed naming as **Expansion Naming**.
