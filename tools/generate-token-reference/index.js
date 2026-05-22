const { generatedTokenMap, readCore, tokenCssPath, writeFileIfChanged } = require("../lib/blueprint");

function buildTokenCss(core) {
  const tokens = generatedTokenMap(core);
  const lines = [
    "/*",
    `  ${core.metadata.name}`,
    "  Generated token reference only.",
    "",
    "  Prefer creating these through native builder variables/tokens.",
    "  Do not treat this as the default delivery model.",
    "*/",
    "",
    "html {",
    `  font-size: ${core.environment.rootFontSizePercent}%;`,
    "}",
    "",
    ":root {",
    "  /* Colors */"
  ];

  for (const token of core.tokens.colors) {
    lines.push(`  ${token.name}: ${tokens.get(token.name)};`);
  }

  lines.push("", "  /* Spacing and layout */");
  for (const token of core.tokens.spacing) {
    lines.push(`  ${token.name}: ${tokens.get(token.name)};`);
  }

  lines.push("", "  /* Typography */");
  for (const token of core.tokens.typography) {
    lines.push(`  ${token.name}: ${tokens.get(token.name)};`);
    if (token.name === "--font-weight-text") {
      lines.push("");
    }
  }

  lines.push("", "  /* Shape and border */");
  for (const token of core.tokens.shapeAndBorder) {
    lines.push(`  ${token.name}: ${tokens.get(token.name)};`);
  }

  lines.push("", "  /* Shadows. Prefer native builder shadow controls where possible. */");
  for (const token of core.tokens.shadow) {
    lines.push(`  ${token.name}: ${tokens.get(token.name)};`);
  }

  lines.push("", "  /* Focus */");
  for (const token of core.tokens.focus) {
    lines.push(`  ${token.name}: ${tokens.get(token.name)};`);
  }

  lines.push("", "  /* Transitions */");
  for (const token of core.tokens.transition) {
    lines.push(`  ${token.name}: ${tokens.get(token.name)};`);
  }

  lines.push("}", "");
  return `${lines.join("\n")}\n`;
}

function main() {
  const core = readCore();
  const changed = writeFileIfChanged(tokenCssPath, buildTokenCss(core));
  console.log(`${changed ? "Updated" : "Unchanged"} ${tokenCssPath}`);
}

if (require.main === module) {
  main();
}

module.exports = { buildTokenCss };
