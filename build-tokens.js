const { default: StyleDictionary } = require("style-dictionary");

async function build() {
  const sd = new StyleDictionary({
    source: [
      "tokens/horizon-core.value.tokens.json",
      "tokens/horizon-semantic.on-light.tokens.json",
      "tokens/horizon-typography.web.tokens.json",
      "tokens/horizon-typography.mobile.tokens.json",
      "tokens/horizon-typography.back-office.tokens.json",
      "tokens/typography.styles.tokens.json",
      "tokens/effects.styles.tokens.json"
    ],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "build/css/",
        files: [
          {
            destination: "tokens.css",
            format: "css/variables"
          }
        ]
      },
      js: {
        transformGroup: "js",
        buildPath: "build/js/",
        files: [
          {
            destination: "tokens.js",
            format: "javascript/es6"
          }
        ]
      }
    }
  });

  await sd.buildAllPlatforms();
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});