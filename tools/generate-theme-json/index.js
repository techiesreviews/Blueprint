const {
  allTokens,
  generatedTokenMap,
  readCore,
  readWordPressThemeJsonAdapter,
  themeJsonPath,
  writeFileIfChanged
} = require("../lib/blueprint");

function labelFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function wpPreset(token, value, valueKey) {
  return {
    slug: token.slug,
    name: labelFromSlug(token.slug),
    [valueKey]: value
  };
}

function tokenByName(core) {
  return new Map(allTokens(core).map((token) => [token.name, token]));
}

function presetRef(core, tokenName) {
  const token = tokenByName(core).get(tokenName);
  if (!token) {
    throw new Error(`Unknown token reference: ${tokenName}`);
  }

  if (core.tokens.colors.includes(token)) {
    return `var:preset|color|${token.slug}`;
  }
  if (core.tokens.spacing.includes(token) && token.name !== "--content-width") {
    return `var:preset|spacing|${token.slug}`;
  }
  if (core.tokens.typography.includes(token) && token.name.match(/^--(h[1-6]|text-(xs|s|m|l|xl|xxl))$/)) {
    return `var:preset|font-size|${token.slug}`;
  }
  if (token.name === "--font-heading") {
    return "var:preset|font-family|heading";
  }
  if (token.name === "--font-text") {
    return "var:preset|font-family|text";
  }

  return `var(--wp--custom--builder-blueprint--${customPathForToken(token.slug)})`;
}

function customPathForToken(slug) {
  if (slug.endsWith("-line-height")) {
    return `line-height--${slug}`;
  }
  if (slug.startsWith("font-weight-")) {
    return `font-weight--${slug}`;
  }
  if (slug.startsWith("radius-")) {
    return `radius--${slug}`;
  }
  if (slug.startsWith("shadow-")) {
    return `shadow--${slug}`;
  }
  if (slug.startsWith("focus-")) {
    return `focus--${slug}`;
  }
  if (slug.startsWith("transition-")) {
    return `transition--${slug}`;
  }
  if (slug === "border-width") {
    return "border--border-width";
  }
  return slug;
}

function customGroup(tokens, values) {
  return Object.fromEntries(tokens.map((token) => [token.slug, values.get(token.name)]));
}

function resolveTokenObject(input, core) {
  if (Array.isArray(input)) {
    return input.map((item) => resolveTokenObject(item, core));
  }
  if (!input || typeof input !== "object") {
    return input;
  }

  const output = {};
  for (const [key, value] of Object.entries(input)) {
    if (key.endsWith("Token")) {
      output[key.slice(0, -"Token".length)] = presetRef(core, value);
      continue;
    }
    output[key] = resolveTokenObject(value, core);
  }
  return output;
}

function buildSettings(core, adapter, values) {
  return {
    appearanceTools: adapter.settings.appearanceTools,
    useRootPaddingAwareAlignments: adapter.settings.useRootPaddingAwareAlignments,
    layout: {
      contentSize: values.get(adapter.settings.layout.contentSizeToken),
      wideSize: values.get(adapter.settings.layout.wideSizeToken)
    },
    color: {
      ...adapter.settings.color,
      palette: core.tokens.colors.map((token) => wpPreset(token, values.get(token.name), "color"))
    },
    spacing: {
      ...adapter.settings.spacing,
      spacingSizes: core.tokens.spacing
        .filter((token) => token.name !== "--content-width")
        .map((token) => wpPreset(token, values.get(token.name), "size"))
    },
    typography: {
      ...adapter.settings.typography,
      fontFamilies: [
        {
          slug: "heading",
          name: "Heading",
          fontFamily: values.get("--font-heading")
        },
        {
          slug: "text",
          name: "Text",
          fontFamily: values.get("--font-text")
        }
      ],
      fontSizes: core.tokens.typography
        .filter((token) => token.name.match(/^--(h[1-6]|text-(xs|s|m|l|xl|xxl))$/))
        .map((token) => wpPreset(token, values.get(token.name), "size"))
    },
    custom: {
      builderBlueprint: {
        contentWidth: values.get("--content-width"),
        border: customGroup(core.tokens.shapeAndBorder.filter((token) => token.name === "--border-width"), values),
        radius: customGroup(core.tokens.shapeAndBorder.filter((token) => token.name.startsWith("--radius-")), values),
        shadow: customGroup(core.tokens.shadow, values),
        focus: customGroup(core.tokens.focus, values),
        transition: customGroup(core.tokens.transition, values),
        lineHeight: customGroup(core.tokens.typography.filter((token) => token.name.endsWith("-line-height")), values),
        fontWeight: customGroup(core.tokens.typography.filter((token) => token.name.startsWith("--font-weight-")), values)
      }
    }
  };
}

function buildStyles(core, adapter) {
  return resolveTokenObject(adapter.styles, core);
}

function buildThemeJson(core, adapter = readWordPressThemeJsonAdapter()) {
  const values = generatedTokenMap(core);
  const themeJson = {
    $schema: adapter.metadata.schema,
    version: adapter.metadata.themeJsonVersion,
    settings: buildSettings(core, adapter, values),
    styles: buildStyles(core, adapter)
  };

  if (adapter.templateParts?.length) {
    themeJson.templateParts = adapter.templateParts;
  }

  return `${JSON.stringify(themeJson, null, 2)}\n`;
}

function main() {
  const core = readCore();
  const adapter = readWordPressThemeJsonAdapter();
  const changed = writeFileIfChanged(themeJsonPath, buildThemeJson(core, adapter));
  console.log(`${changed ? "Updated" : "Unchanged"} ${themeJsonPath}`);
}

if (require.main === module) {
  main();
}

module.exports = { buildThemeJson };
