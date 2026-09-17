import { startingWith, groupByRole, page, swatchGrid, escapeHtml } from "./tokens.js";

export default { title: "Semantic Colour" };

function roleSections(tokens, prefix) {
  const groups = groupByRole(tokens, prefix);
  return [...groups.entries()]
    .map(([role, items]) => `<h2>${escapeHtml(role)}</h2>${swatchGrid(items)}`)
    .join("");
}

const build = (title, prefix, lede) => {
  const tokens = startingWith(prefix);
  return () => page(title, lede, roleSections(tokens, prefix), tokens.length);
};

export const Background = build(
  "Background",
  "color-bg-",
  "Surface and fill colours, grouped by role. These are what product code should reference."
);

export const Text = build(
  "Text",
  "color-text-",
  "Foreground colours. <code>foreground</code> variants are for text sitting on the matching " +
    "filled background; <code>on-light</code> variants are for text on a tinted subtle surface."
);

export const Border = build("Border", "color-border-", "Stroke colours, including the focus ring.");

export const Icon = build("Icon", "color-icon-", "Icon fills, mirroring the text roles.");
