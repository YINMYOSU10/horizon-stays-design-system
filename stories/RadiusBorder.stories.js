import { startingWith, page, escapeHtml } from "./tokens.js";

export default { title: "Radius & Border" };

function boxes(tokens, styleFor) {
  return `<div class="tg-rows">${tokens
    .map(
      (t) => `
      <div class="tg-row">
        <code class="tg-name">--${escapeHtml(t.name)}</code>
        <code class="tg-value">${escapeHtml(t.value)}</code>
        <div class="tg-box" style="${styleFor(t)}"></div>
      </div>`
    )
    .join("")}</div>`;
}

export const Radius = () => {
  const tokens = startingWith("border-radius-");
  return page(
    "Border radius",
    "Primitive steps plus the semantic aliases that map a radius to a component role.",
    boxes(tokens, (t) => `border-radius: var(--${t.name})`),
    tokens.length
  );
};

export const Width = () => {
  const tokens = startingWith("border-width-");
  return page(
    "Border width",
    "Stroke weights. <code>0.5px</code> renders as a hairline on retina displays.",
    boxes(tokens, (t) => `border-width: var(--${t.name}); height: 40px`),
    tokens.length
  );
};
