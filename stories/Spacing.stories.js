import { startingWith, page, escapeHtml } from "./tokens.js";

export default { title: "Spacing" };

const px = (v) => Number.parseFloat(v) || 0;

function bars(tokens) {
  const max = Math.max(...tokens.map((t) => px(t.value)), 1);
  return `<div class="tg-rows">${tokens
    .map(
      (t) => `
      <div class="tg-row">
        <code class="tg-name">--${escapeHtml(t.name)}</code>
        <code class="tg-value">${escapeHtml(t.value)}</code>
        <div class="tg-bar" style="width: ${(px(t.value) / max) * 100}%"></div>
      </div>`
    )
    .join("")}</div>`;
}

function section(label, tokens) {
  if (!tokens.length) return "";
  return `<h2>${escapeHtml(label)}</h2>${bars(tokens)}`;
}

export const Scale = () => {
  const padding = startingWith("spacing-padding-");
  const gap = startingWith("spacing-gap-");
  const margin = startingWith("spacing-margin-");
  const layout = startingWith("spacing-layout-");
  const raw = startingWith("spacing-").filter(
    (t) => !/^spacing-(padding|gap|margin|layout)-/.test(t.name)
  );
  const all = [...raw, ...padding, ...gap, ...margin, ...layout];
  return page(
    "Spacing",
    "Bars are drawn to scale against the largest value in each group.",
    section("Scale", raw) +
      section("Padding", padding) +
      section("Gap", gap) +
      section("Margin", margin) +
      section("Layout", layout),
    all.length
  );
};
