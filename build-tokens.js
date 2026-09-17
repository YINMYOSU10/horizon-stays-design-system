const { default: StyleDictionary } = require("style-dictionary");

const CORE = [
  "tokens/horizon-core.value.tokens.json",
  "tokens/horizon-semantic.on-light.tokens.json"
];

const STYLES = [
  "tokens/typography.styles.tokens.json",
  "tokens/effects.styles.tokens.json"
];

// horizon-typography is a multi-mode collection: web / mobile / back-office all
// declare the SAME token names with different values. They cannot share one
// source list without silently overwriting each other, so each mode is built
// into its own stylesheet below.
const TYPOGRAPHY_MODES = ["web", "mobile", "back-office"];
const typographyFile = (mode) => `tokens/horizon-typography.${mode}.tokens.json`;

// The flat build. Kept byte-for-byte compatible with what consumers already
// import: one tokens.css / tokens.js carrying the default (web) typography.
async function buildFlat() {
  const sd = new StyleDictionary({
    source: [...CORE, typographyFile("web"), ...STYLES],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "build/css/",
        files: [{ destination: "tokens.css", format: "css/variables" }]
      },
      js: {
        transformGroup: "js",
        buildPath: "build/js/",
        files: [{ destination: "tokens.js", format: "javascript/es6" }]
      }
    }
  });
  await sd.buildAllPlatforms();
}

// One stylesheet per typography mode, scoped to a [data-typography-mode]
// attribute so a page can switch platforms without a rebuild.
async function buildTypographyMode(mode) {
  const file = typographyFile(mode);
  const sd = new StyleDictionary({
    source: [...CORE, file],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "build/css/",
        files: [
          {
            destination: `typography.${mode}.css`,
            format: "css/variables",
            filter: (token) => token.filePath === file,
            options: { selector: `[data-typography-mode="${mode}"]` }
          }
        ]
      },
      js: {
        transformGroup: "js",
        buildPath: "build/js/",
        files: [
          {
            destination: `typography.${mode}.js`,
            format: "javascript/es6",
            filter: (token) => token.filePath === file
          }
        ]
      }
    }
  });
  await sd.buildAllPlatforms();
}

async function build() {
  await buildFlat();
  for (const mode of TYPOGRAPHY_MODES) {
    await buildTypographyMode(mode);
  }
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
