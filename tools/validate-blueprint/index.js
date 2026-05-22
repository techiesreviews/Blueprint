const fs = require("fs");
const path = require("path");
const { allTokens, corePath, readCore, repoRoot, themeJsonPath, tokenCssPath } = require("../lib/blueprint");
const { buildTokenCss } = require("../generate-token-reference");
const { buildThemeJson } = require("../generate-theme-json");

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function requireObject(parent, key, location) {
  if (!parent || typeof parent[key] !== "object" || parent[key] === null) {
    fail(`${location}.${key} is required`);
  }
}

function ensureUnique(items, getKey, label) {
  const seen = new Set();
  for (const item of items) {
    const key = getKey(item);
    if (seen.has(key)) {
      fail(`Duplicate ${label}: ${key}`);
    }
    seen.add(key);
  }
}

function validateCoreShape(core) {
  requireObject(core, "metadata", "core");
  requireObject(core, "philosophy", "core");
  requireObject(core, "environment", "core");
  requireObject(core, "fluidScale", "core");
  requireObject(core, "sourceSettings", "core");
  requireObject(core, "tokens", "core");
  requireObject(core, "classes", "core");
  requireObject(core, "accessibility", "core");
  requireObject(core, "policies", "core");

  if (core.metadata?.name !== "Builder Blueprint") {
    fail("metadata.name must be Builder Blueprint");
  }

  if (core.environment?.rootFontSizePercent !== 62.5) {
    fail("environment.rootFontSizePercent must remain 62.5 for the current Core");
  }

  if (core.philosophy?.targetWorkflowDeterminesNativeSurface !== true) {
    fail("philosophy.targetWorkflowDeterminesNativeSurface must be true");
  }

  if (!Array.isArray(core.targetWorkflows) || core.targetWorkflows.length === 0) {
    fail("targetWorkflows must list supported workflow labels");
  }
}

function validateTokens(core) {
  const tokens = allTokens(core);
  ensureUnique(tokens, (token) => token.name, "token name");
  ensureUnique(tokens, (token) => token.slug, "token slug");

  for (const token of tokens) {
    if (!/^--[a-z0-9]+(?:-[a-z0-9]+)*$/.test(token.name)) {
      fail(`Malformed token name: ${token.name}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(token.slug)) {
      fail(`Malformed token slug: ${token.slug}`);
    }
  }
}

function validateClasses(core) {
  const classes = Object.values(core.classes).flat();
  ensureUnique(classes, (className) => className, "class");

  for (const className of classes) {
    if (!/^[a-z][a-z0-9]*(?:__[a-z][a-z0-9]*)?$/.test(className)) {
      fail(`Malformed class name: ${className}`);
    }
  }
}

function validateGenerated(core) {
  const expectedCss = buildTokenCss(core);
  const actualCss = fs.existsSync(tokenCssPath) ? fs.readFileSync(tokenCssPath, "utf8") : "";
  if (actualCss !== expectedCss) {
    fail(`${path.relative(repoRoot, tokenCssPath)} is stale. Run npm run generate:tokens.`);
  }

  const expectedThemeJson = buildThemeJson(core);
  const actualThemeJson = fs.existsSync(themeJsonPath) ? fs.readFileSync(themeJsonPath, "utf8") : "";
  if (actualThemeJson !== expectedThemeJson) {
    fail(`${path.relative(repoRoot, themeJsonPath)} is stale. Run npm run generate:theme-json.`);
  }
}

function validateAdapterReferences(core) {
  const knownTokens = new Set(allTokens(core).map((token) => token.name));
  const adaptersDir = path.join(repoRoot, "blueprint", "adapters");
  for (const fileName of fs.readdirSync(adaptersDir).filter((name) => name.endsWith(".md"))) {
    const filePath = path.join(adaptersDir, fileName);
    const content = fs.readFileSync(filePath, "utf8");
    const tokenRefs = content.match(/--[a-z0-9-]+/g) || [];
    for (const tokenRef of tokenRefs) {
      if (tokenRef.startsWith("--wp--")) {
        continue;
      }
      if (!knownTokens.has(tokenRef)) {
        fail(`${path.relative(repoRoot, filePath)} references unknown token ${tokenRef}`);
      }
    }
  }

  for (const adapter of ["elementor-v4.md", "bricks.md"]) {
    const adapterPath = path.join(adaptersDir, adapter);
    if (fs.existsSync(adapterPath)) {
      warn(`${path.relative(repoRoot, adapterPath)} is checklist-level and does not yet have executable coverage.`);
    }
  }
}

function validateWordPressAdapter(core) {
  const adapterPath = path.join(repoRoot, "blueprint", "adapters", "wordpress-theme-json.json");
  const adapter = JSON.parse(fs.readFileSync(adapterPath, "utf8"));
  const knownTokens = new Set(allTokens(core).map((token) => token.name));
  const content = JSON.stringify(adapter);
  const tokenRefs = content.match(/--[a-z0-9-]+/g) || [];

  for (const tokenRef of tokenRefs) {
    if (!knownTokens.has(tokenRef)) {
      fail(`${path.relative(repoRoot, adapterPath)} references unknown token ${tokenRef}`);
    }
  }

  if (adapter.principles?.gutenbergNativeFirst !== true) {
    fail("wordpress-theme-json adapter must keep principles.gutenbergNativeFirst true");
  }
  if (adapter.principles?.preferBlockStylesAndVariationsOverClasses !== true) {
    fail("wordpress-theme-json adapter must prefer block styles and variations over classes");
  }
}

function getPath(object, pathParts) {
  return pathParts.reduce((current, key) => (current && current[key] !== undefined ? current[key] : undefined), object);
}

function expectEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(`${message}. Expected ${expected}, got ${actual}`);
  }
}

function expectArrayEqual(actual, expected, message) {
  if (!Array.isArray(actual)) {
    fail(`${message}. Expected an array`);
    return;
  }

  if (actual.length !== expected.length || actual.some((item, index) => item !== expected[index])) {
    fail(`${message}. Expected ${expected.join(", ")}, got ${actual.join(", ")}`);
  }
}

function validateWordPressGeneratedThemeJson(core) {
  if (!fs.existsSync(themeJsonPath)) {
    fail(`${path.relative(repoRoot, themeJsonPath)} is missing. Run npm run generate:theme-json.`);
    return;
  }

  let themeJson;
  try {
    themeJson = JSON.parse(fs.readFileSync(themeJsonPath, "utf8"));
  } catch (error) {
    fail(`${path.relative(repoRoot, themeJsonPath)} is not valid JSON: ${error.message}`);
    return;
  }

  expectEqual(themeJson.version, 3, "generated theme.json version must remain v3");
  expectEqual(themeJson.settings?.appearanceTools, true, "generated theme.json must enable appearanceTools");
  expectEqual(
    themeJson.settings?.useRootPaddingAwareAlignments,
    true,
    "generated theme.json must use root-padding-aware alignments"
  );

  expectArrayEqual(
    themeJson.settings?.color?.palette?.map((item) => item.slug),
    core.tokens.colors.map((token) => token.slug),
    "generated theme.json color palette must match Core color tokens"
  );
  expectArrayEqual(
    themeJson.settings?.spacing?.spacingSizes?.map((item) => item.slug),
    core.tokens.spacing.filter((token) => token.name !== "--content-width").map((token) => token.slug),
    "generated theme.json spacing presets must match Core spacing tokens"
  );
  expectArrayEqual(
    themeJson.settings?.typography?.fontSizes?.map((item) => item.slug),
    core.tokens.typography
      .filter((token) => token.name.match(/^--(h[1-6]|text-(xs|s|m|l|xl|xxl))$/))
      .map((token) => token.slug),
    "generated theme.json font size presets must match Core heading and text tokens"
  );
  expectArrayEqual(
    themeJson.settings?.typography?.fontFamilies?.map((item) => item.slug),
    ["heading", "text"],
    "generated theme.json font family presets must expose heading and text"
  );

  expectEqual(
    getPath(themeJson, ["styles", "color", "background"]),
    "var:preset|color|base",
    "generated theme.json global background must use the base preset"
  );
  expectEqual(
    getPath(themeJson, ["styles", "color", "text"]),
    "var:preset|color|shade",
    "generated theme.json global text color must use the shade preset"
  );
  expectEqual(
    getPath(themeJson, ["styles", "spacing", "blockGap"]),
    "var:preset|spacing|space-m",
    "generated theme.json global block gap must use the medium spacing preset"
  );
  expectEqual(
    getPath(themeJson, ["styles", "typography", "fontSize"]),
    "var:preset|font-size|text-m",
    "generated theme.json global text size must use the medium text preset"
  );

  for (const blockName of ["core/button", "core/buttons", "core/columns", "core/group", "core/navigation", "core/quote"]) {
    if (!themeJson.styles?.blocks?.[blockName]) {
      fail(`generated theme.json must include ${blockName} block styles`);
    }
  }

  if (!themeJson.styles?.blocks?.["core/button"]?.variations?.outline) {
    fail("generated theme.json must include the core/button outline variation");
  }

  expectArrayEqual(
    themeJson.templateParts?.map((part) => part.area),
    ["header", "footer"],
    "generated theme.json template parts must expose header and footer"
  );
}

function main() {
  let core;
  try {
    core = readCore();
  } catch (error) {
    console.error(`Failed to read ${corePath}: ${error.message}`);
    process.exit(1);
  }

  validateCoreShape(core);
  validateTokens(core);
  validateClasses(core);
  validateGenerated(core);
  validateAdapterReferences(core);
  validateWordPressAdapter(core);
  validateWordPressGeneratedThemeJson(core);

  for (const message of warnings) {
    console.warn(`WARN ${message}`);
  }

  if (errors.length > 0) {
    for (const message of errors) {
      console.error(`ERROR ${message}`);
    }
    process.exit(1);
  }

  console.log("Blueprint validation passed.");
}

if (require.main === module) {
  main();
}
