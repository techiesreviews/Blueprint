const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..", "..");
const corePath = path.join(repoRoot, "blueprint", "core.json");
const wordpressThemeJsonAdapterPath = path.join(repoRoot, "blueprint", "adapters", "wordpress-theme-json.json");
const tokenCssPath = path.join(repoRoot, "blueprint", "reference", "generated-tokens.css");
const themeJsonPath = path.join(repoRoot, "blueprint", "reference", "generated-theme.json");

function readCore() {
  return JSON.parse(fs.readFileSync(corePath, "utf8"));
}

function readWordPressThemeJsonAdapter() {
  return JSON.parse(fs.readFileSync(wordpressThemeJsonAdapterPath, "utf8"));
}

function writeFileIfChanged(filePath, content) {
  const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  if (current === content) {
    return false;
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  return true;
}

function toRem(px, rootPx) {
  return `${(px / rootPx).toFixed(3)}rem`;
}

function fluidClamp(minPx, maxPx, core) {
  const { viewportMinPx, viewportMaxPx } = core.fluidScale;
  const { rootPx } = core.environment;
  const slope = ((maxPx - minPx) / (viewportMaxPx - viewportMinPx)) * 100;
  const intercept = minPx - (slope * viewportMinPx) / 100;
  const lower = Math.min(minPx, maxPx);
  const upper = Math.max(minPx, maxPx);
  return `clamp(${toRem(lower, rootPx)}, calc(${toRem(intercept, rootPx)} + ${slope.toFixed(3)}vw), ${toRem(upper, rootPx)})`;
}

function powScale(base, scale, step) {
  return base * Math.pow(scale, step);
}

function tokenValue(token, core) {
  const settings = core.sourceSettings;
  switch (token.kind) {
    case "fluid-space": {
      const min = powScale(settings.spacing.baseSpaceMinPx, settings.spacing.mobileSpaceScale, token.step);
      const max = powScale(settings.spacing.baseSpaceMaxPx, settings.spacing.desktopSpaceScale, token.step);
      return fluidClamp(min, max, core);
    }
    case "fluid-range": {
      const source = token.source;
      if (source === "sectionSpace") {
        return fluidClamp(settings.spacing.sectionSpaceMinPx, settings.spacing.sectionSpaceMaxPx, core);
      }
      if (source === "gutter") {
        return fluidClamp(settings.spacing.gutterMinPx, settings.spacing.gutterMaxPx, core);
      }
      throw new Error(`Unknown fluid range source: ${source}`);
    }
    case "fluid-heading": {
      const exponent = 6 - token.level;
      const min = powScale(settings.typography.baseHeadingMinPx, settings.typography.headingScaleMin, exponent);
      const rawMax = powScale(settings.typography.baseHeadingMaxPx, settings.typography.headingScaleMax, exponent);
      const max = token.level === 1 ? Math.min(rawMax, settings.typography.h1MaxPx) : rawMax;
      return fluidClamp(min, max, core);
    }
    case "fluid-text": {
      const min = powScale(settings.typography.baseTextMinPx, settings.typography.textScaleMin, token.step);
      const max = powScale(settings.typography.baseTextMaxPx, settings.typography.textScaleMax, token.step);
      return fluidClamp(min, max, core);
    }
    case "fluid-radius": {
      const key = token.size.charAt(0).toUpperCase() + token.size.slice(1);
      return fluidClamp(settings.radius[`radius${key}MinPx`], settings.radius[`radius${key}MaxPx`], core);
    }
    case "font-family":
    case "font-weight":
    case "static":
      return token.value;
    default:
      if (token.defaultValue) {
        return token.defaultValue;
      }
      throw new Error(`Unknown token kind: ${token.kind}`);
  }
}

function allTokens(core) {
  return Object.values(core.tokens).flat();
}

function generatedTokenMap(core) {
  const tokens = new Map();
  for (const token of core.tokens.colors) {
    tokens.set(token.name, token.defaultValue);
  }

  for (const token of allTokens(core).filter((item) => !core.tokens.colors.includes(item))) {
    tokens.set(token.name, tokenValue(token, core));
  }

  return tokens;
}

module.exports = {
  allTokens,
  corePath,
  fluidClamp,
  generatedTokenMap,
  readCore,
  readWordPressThemeJsonAdapter,
  repoRoot,
  themeJsonPath,
  tokenCssPath,
  tokenValue,
  wordpressThemeJsonAdapterPath,
  writeFileIfChanged
};
