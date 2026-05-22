const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { readCore, repoRoot, themeJsonPath, tokenCssPath } = require("../lib/blueprint");
const { buildTokenCss } = require("../generate-token-reference");
const { buildThemeJson } = require("../generate-theme-json");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function slugs(items) {
  return items.map((item) => item.slug);
}

function assertDeepEqual(actual, expected, message) {
  assert.deepStrictEqual(actual, expected, message);
}

function assertGeneratedSnapshots(core) {
  assert.strictEqual(read(tokenCssPath), buildTokenCss(core), "generated token CSS snapshot is stale");
  assert.strictEqual(read(themeJsonPath), buildThemeJson(core), "generated theme.json snapshot is stale");
}

function assertWordPressGeneratedShape(core) {
  const themeJson = JSON.parse(read(themeJsonPath));

  assert.strictEqual(themeJson.version, 3, "theme.json version should remain v3");
  assert.strictEqual(themeJson.settings.appearanceTools, true, "theme.json should enable appearance tools");
  assert.strictEqual(
    themeJson.settings.useRootPaddingAwareAlignments,
    true,
    "theme.json should keep root-padding-aware alignments"
  );

  assertDeepEqual(
    slugs(themeJson.settings.color.palette),
    core.tokens.colors.map((token) => token.slug),
    "color palette should map every Core color token in order"
  );

  assertDeepEqual(
    slugs(themeJson.settings.spacing.spacingSizes),
    core.tokens.spacing.filter((token) => token.name !== "--content-width").map((token) => token.slug),
    "spacing presets should map every Core spacing token except content width"
  );

  assertDeepEqual(
    slugs(themeJson.settings.typography.fontSizes),
    core.tokens.typography
      .filter((token) => token.name.match(/^--(h[1-6]|text-(xs|s|m|l|xl|xxl))$/))
      .map((token) => token.slug),
    "font size presets should map Core heading and text size tokens"
  );

  assert.deepStrictEqual(
    themeJson.settings.typography.fontFamilies.map((font) => font.slug),
    ["heading", "text"],
    "font family presets should expose heading and text"
  );

  assert.strictEqual(
    themeJson.styles.color.background,
    "var:preset|color|base",
    "global background should use the base color preset"
  );
  assert.strictEqual(themeJson.styles.color.text, "var:preset|color|shade", "global text should use the shade preset");
  assert.strictEqual(
    themeJson.styles.spacing.blockGap,
    "var:preset|spacing|space-m",
    "global block gap should use the medium spacing preset"
  );
  assert.strictEqual(
    themeJson.styles.typography.fontSize,
    "var:preset|font-size|text-m",
    "global text size should use the medium text preset"
  );

  for (const blockName of ["core/button", "core/buttons", "core/columns", "core/group", "core/navigation", "core/quote"]) {
    assert.ok(themeJson.styles.blocks[blockName], `theme.json should include ${blockName} block styles`);
  }

  assert.ok(
    themeJson.styles.blocks["core/button"].variations.outline,
    "theme.json should include the core/button outline variation"
  );
  assert.deepStrictEqual(
    themeJson.templateParts.map((part) => part.area),
    ["header", "footer"],
    "theme.json should expose header and footer template parts"
  );
}

function main() {
  const core = readCore();
  assertGeneratedSnapshots(core);
  assertWordPressGeneratedShape(core);
  console.log(`Generated output tests passed for ${path.relative(repoRoot, tokenCssPath)} and ${path.relative(repoRoot, themeJsonPath)}.`);
}

if (require.main === module) {
  main();
}
