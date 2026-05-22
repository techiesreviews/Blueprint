# Builder Blueprint

A reusable website-building blueprint that defines portable design decisions while preferring each builder's native features over shipped standalone CSS.

## Language

**Blueprint**:
A reusable setup specification for tokens, classes, builder mappings, and project rules.
_Avoid_: theme, library

**Core Contract**:
The single machine-readable contract for the **Core**, stored at `blueprint/core.json`.
_Avoid_: source settings file, generated output, adapter mapping

**Agentic Workflow Source**:
A reusable source of truth intended for AI agents to read, apply, and generate project-specific setup from.
_Avoid_: WordPress plugin, WordPress theme

**Skill**:
An agent workflow that applies the **Blueprint** to a specific task, adapter, validation pass, or generated output.
_Avoid_: Blueprint replacement, source of truth

**Tool**:
A script or executable helper used by a **Skill** to generate, validate, or export project artifacts from the **Blueprint**.
_Avoid_: Blueprint, adapter

**Core**:
The builder-agnostic decisions that should stay portable across tools.
_Avoid_: Elementor setup, Bricks setup

**Adapter**:
A builder-specific mapping that applies the Core through native controls, presets, theme settings, or supported CSS entry points.
_Avoid_: Separate system, fork

**Native Feature**:
A capability provided directly by a builder or platform, such as Elementor Variables, Bricks classes, or WordPress `theme.json`.
_Avoid_: Custom CSS fallback

**Target Workflow**:
The implementation path selected for the current project, such as WordPress Gutenberg, Elementor, Bricks, or plain HTML and CSS.
_Avoid_: Universal adapter

**Native Surface**:
The first-choice implementation surface for a **Target Workflow**, such as builder variables, builder classes, `theme.json`, block settings, or project CSS.
_Avoid_: Universal styling layer

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
- The **Core Contract** is the canonical machine-readable source for the **Core**.
- An **Adapter** applies the **Core** through one builder or platform.
- A **Skill** executes a repeatable agent workflow against the **Blueprint**.
- The **Blueprint** is the contract; **Skills** are the execution layer.
- A **Tool** provides executable machinery that **Skills** can call.
- A **Native Feature** is preferred before **Custom CSS**.
- A **Target Workflow** determines the appropriate **Native Surface**.
- A **Native Surface** is defined by an **Adapter**, not assumed globally by the **Core**.
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
- "Repo location" could imply installing the repository inside WordPress. Resolved: the repository is an **Agentic Workflow Source** kept outside WordPress projects; WordPress receives generated or copied artifacts through an **Adapter**.
- "Skills instead of Blueprint" could make agent procedures the source of truth. Resolved: the **Blueprint** remains the contract and **Skills** become the execution layer.
- "Scripts" was too generic for reusable agent-facing machinery. Resolved: use **Tool** for executable helpers and place them under `tools/`.
- "`source-settings.json` and `core.json` could become competing sources of truth. Resolved: use `blueprint/core.json` as the single **Core Contract** and remove `source-settings.json` during implementation.
