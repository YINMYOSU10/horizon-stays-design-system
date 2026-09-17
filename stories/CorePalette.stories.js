import { where, ramps, page, swatchGrid, escapeHtml, inkOn, isLowContrast, INK_DARK } from "./tokens.js";

export default { title: "Core Palette" };

const FAMILY_STEPS = /^color-(teal|blue|green|yellow|orange|red|neutral)-\d+$/;

const rampTokens = where((name) => FAMILY_STEPS.test(name));
const standalone = where(
  (name) => name.startsWith("color-") && ["color-white", "color-black", "color-transparent"].includes(name)
);

function rampRow(family, steps) {
  const ordered = [...steps].sort((a, b) => Number(a.step) - Number(b.step));
  return `
    <h2>${escapeHtml(family)}</h2>
    <div class="tg-ramp">
      ${ordered
        .map((s) => {
          const ink = inkOn(s.value);
          // A handful of mid-tones cannot reach AA against either ink. Those
          // labels get a backing chip rather than being left at ~3.9:1.
          const tight = isLowContrast(s.value);
          const backing = ink === INK_DARK ? "rgba(255,255,255,0.92)" : "rgba(33,42,43,0.92)";
          return `<div class="tg-ramp-step${tight ? " is-tight" : ""}" style="--tg-chip: var(--${
            s.name
          }); color: ${ink}; --tg-ink-backing: ${backing}">
            <span class="tg-ramp-label">${escapeHtml(s.step)}</span>
            <span>${escapeHtml(s.value)}</span>
          </div>`;
        })
        .join("")}
    </div>`;
}

export const Ramps = () => {
  const families = ramps(rampTokens, "color-");
  const body = [...families.entries()].map(([family, steps]) => rampRow(family, steps)).join("");
  return page(
    "Core palette",
    "The raw colour ramps from <code>horizon-core</code>. These are the primitives &mdash; " +
      "product code should reference the semantic tokens instead, so a palette change flows " +
      "through without touching components.",
    body + `<h2>Standalone</h2>${swatchGrid(standalone)}`,
    rampTokens.length + standalone.length
  );
};

export const AllCoreColours = () =>
  page(
    "Every core colour token",
    "Flat listing of every colour primitive in the build.",
    swatchGrid(where((n) => n.startsWith("color-") && !/(bg|text|border|icon)-/.test(n))),
    where((n) => n.startsWith("color-") && !/(bg|text|border|icon)-/.test(n)).length
  );
