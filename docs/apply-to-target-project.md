# Apply The Blueprint To A Target Project

Use this workflow when a project explicitly wants to apply the Builder Blueprint.

## 1. Confirm The Target Workflow

Name the selected Target Workflow before generating or copying anything.

Supported starting workflows:

```txt
WordPress Gutenberg
Elementor
Bricks
plain HTML and CSS
```

The Target Workflow determines the Native Surface. Do not assume CSS custom properties, Global Classes, or `theme.json` are the right delivery model until the workflow is known.

## 2. Generate And Validate This Source Repository

From this repository, refresh generated reference artifacts and validate them.

```sh
npm run generate
npm run test:generated
npm run validate
```

If PowerShell blocks `npm.ps1`, run the underlying Node tools directly:

```sh
node tools/generate-token-reference
node tools/generate-theme-json
node tools/test-generated-outputs
node tools/validate-blueprint
```

## 3. Apply Through The Adapter

Use the adapter for the selected Target Workflow.

For WordPress Gutenberg:

1. Generate `blueprint/reference/generated-theme.json`.
2. Copy or merge it into the target block theme only after the project chooses that artifact.
3. Keep target-theme edits in the target project, not in this source repository.
4. Prefer WordPress settings, presets, styles, block styles, and variations before classes.

For Elementor or Bricks:

1. Read the adapter checklist.
2. Create native variables, theme styles, controls, or Global Classes manually until an executable adapter exists.
3. Document builder limitations before adding Custom CSS.

## 4. Record Project-Specific Gaps

Document any limitation or workaround in the target project.

Examples:

```txt
Builder does not accept OKLCH in native color controls.
Skip-link support requires minimal project CSS.
The project needs a Prose Recipe for long-form CMS content.
```

Do not add optional recipes, utility classes, theme contexts, or External CSS to the Core just because one target project needs them.
