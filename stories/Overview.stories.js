import { allTokens, typographyByMode, TYPOGRAPHY_MODES, where, page, escapeHtml } from "./tokens.js";

export default { title: "Overview" };

const GROUPS = [
  ["Core colour", (n) => /^color-(teal|blue|green|yellow|orange|red|neutral)-/.test(n) || ["color-white", "color-black", "color-transparent"].includes(n)],
  ["Background", (n) => n.startsWith("color-bg-")],
  ["Text", (n) => n.startsWith("color-text-")],
  ["Border colour", (n) => n.startsWith("color-border-")],
  ["Icon", (n) => n.startsWith("color-icon-")],
  ["Spacing", (n) => n.startsWith("spacing-")],
  ["Radius", (n) => n.startsWith("border-radius-")],
  ["Border width", (n) => n.startsWith("border-width-")],
  ["Type ramp", (n) => /-(font-size|line-height)$/.test(n) && !n.startsWith("font-") && !n.startsWith("line-height-")],
  ["Type primitives", (n) => /^(font-family-|font-size-|font-weight-|line-height-)/.test(n)],
  ["Composite type styles", (n) => n.startsWith("horizon-semantic-typography-")],
  ["Elevation", (n) => n.startsWith("horizon-semantic-elevation-")]
];

export const Contents = () => {
  const counted = new Set();
  const rows = GROUPS.map(([label, test]) => {
    const items = where(test);
    items.forEach((t) => counted.add(t.name));
    return `<div class="tg-row" style="grid-template-columns: 1fr 80px">
      <span>${escapeHtml(label)}</span><code class="tg-value">${items.length}</code>
    </div>`;
  }).join("");

  const uncounted = allTokens.filter((t) => !counted.has(t.name));
  const stray = uncounted.length
    ? `<div class="tg-note"><strong>${uncounted.length} token(s) not covered by a group above:</strong>
         ${uncounted.map((t) => `<code>--${escapeHtml(t.name)}</code>`).join(", ")}.
         Add a group in <code>stories/Overview.stories.js</code> if these should be documented.</div>`
    : "";

  const modeCounts = TYPOGRAPHY_MODES.map(
    (m) => `<div class="tg-row" style="grid-template-columns: 1fr 80px">
      <span>horizon-typography &middot; ${escapeHtml(m)}</span>
      <code class="tg-value">${typographyByMode[m].length}</code></div>`
  ).join("");

  return page(
    "Horizon Stays tokens",
    "Generated from <code>tokens/</code> by Style Dictionary. Every story on the left reads the " +
      "built stylesheet directly, so this gallery stays in step with whatever the Figma plugin " +
      "last exported &mdash; no hand-maintained lists.",
    `<h2>In the flat build</h2><div class="tg-rows">${rows}</div>
     ${stray}
     <h2>Typography modes</h2>
     <p class="tg-lede">Each mode redefines the same ramp token names, so they are built into
     separate stylesheets scoped to <code>[data-typography-mode]</code>.</p>
     <div class="tg-rows">${modeCounts}</div>`,
    allTokens.length
  );
};
