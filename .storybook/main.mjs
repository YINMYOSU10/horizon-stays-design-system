/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: [
    "../stories/**/*.stories.js",
    "../src/**/*.stories.tsx",
    "../src/**/*.mdx"
  ],
  addons: [
    // CLAUDE.md: "A component's props are its documented API." addon-docs is
    // what renders that API — without it there is no Docs tab at all.
    "@storybook/addon-docs",
    // Listed in tools.md as part of the stack.
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    defaultName: "Docs"
  }
};

export default config;
