import { startingWith, page, escapeHtml } from "./tokens.js";

export default { title: "Elevation" };

export const Shadows = () => {
  const tokens = startingWith("horizon-semantic-elevation-");
  const body = `<div class="tg-rows" style="gap: 32px">${tokens
    .map((t) => {
      const label = t.name.replace("horizon-semantic-elevation-", "");
      return `
        <div>
          <div class="tg-elev" style="box-shadow: var(--${t.name})">
            <strong>${escapeHtml(label)}</strong>
            ${t.description ? `<div class="tg-value">${escapeHtml(t.description)}</div>` : ""}
          </div>
          <code class="tg-name" style="display:block;margin-top:8px">--${escapeHtml(t.name)}</code>
          <code class="tg-value">${escapeHtml(t.value)}</code>
        </div>`;
    })
    .join("")}</div>`;

  return page(
    "Elevation",
    "Shadow styles from the effects collection. Each is a two-layer shadow tinted with neutral/1000 at low alpha.",
    body,
    tokens.length
  );
};
