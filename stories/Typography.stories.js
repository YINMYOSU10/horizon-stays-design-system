import {
  typographyByMode,
  TYPOGRAPHY_MODES,
  startingWith,
  page,
  pageHtml,
  mount,
  escapeHtml
} from "./tokens.js";

export default { title: "Typography" };

const SAMPLE = "Book a stay in Lisbon";

/** Derive the style names (heading-1, body-sm, ...) from the -font-size tokens. */
function styleNames(tokens) {
  return tokens.filter((t) => t.name.endsWith("-font-size")).map((t) => t.name.replace(/-font-size$/, ""));
}

// Weight is not encoded in the size/leading tokens, so read it from the
// composite style token (`Semi Bold 32px/32px Inter`) that Figma exports.
const WEIGHTS = new Map(
  startingWith("horizon-semantic-typography-").map((t) => {
    const style = t.name.replace("horizon-semantic-typography-", "");
    const weight = /^(Semi Bold|Bold|Medium|Regular|Light)/.exec(t.value);
    return [style, weight ? weight[1] : "Regular"];
  })
);

const CSS_WEIGHT = {
  Light: 300,
  Regular: 400,
  Medium: 500,
  "Semi Bold": 600,
  Bold: 700
};

function specimens(mode) {
  const tokens = typographyByMode[mode];
  const byName = new Map(tokens.map((t) => [t.name, t.value]));
  return styleNames(tokens)
    .map((style) => {
      const size = byName.get(`${style}-font-size`);
      const leading = byName.get(`${style}-line-height`);
      const weightLabel = WEIGHTS.get(style) || "Regular";
      const weight = CSS_WEIGHT[weightLabel] ?? 400;
      return `
        <div class="tg-row" style="grid-template-columns: minmax(180px, 220px) 1fr">
          <div>
            <code class="tg-name">${escapeHtml(style)}</code>
            <code class="tg-value">${escapeHtml(weightLabel)} ${escapeHtml(size)}/${escapeHtml(leading)}</code>
          </div>
          <div style="font-size: ${escapeHtml(size)}; line-height: ${escapeHtml(
            leading
          )}; font-weight: ${weight}">${SAMPLE}</div>
        </div>`;
    })
    .join("");
}

export const TypeRamp = () => {
  const container = document.createElement("div");

  const render = (mode) => {
    container.innerHTML = pageHtml(
      "Type ramp",
      "The <code>horizon-typography</code> collection ships three platform modes. Switch between " +
        "them to see how the ramp retunes &mdash; mobile drops the display sizes, back-office " +
        "tightens leading.",
      `<div class="tg-modes" role="group" aria-label="Typography mode">
         ${TYPOGRAPHY_MODES.map(
           (m) =>
             `<button class="tg-mode-btn" type="button" data-mode="${m}" aria-pressed="${
               m === mode
             }">${escapeHtml(m)}</button>`
         ).join("")}
       </div>
       <div class="tg-rows">${specimens(mode)}</div>`,
      typographyByMode[mode].length
    );
    container.querySelectorAll(".tg-mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => render(btn.dataset.mode));
    });
  };

  render("web");
  return mount(container);
};

export const ModeComparison = () => {
  const rows = styleNames(typographyByMode.web)
    .map((style) => {
      const cells = TYPOGRAPHY_MODES.map((mode) => {
        const byName = new Map(typographyByMode[mode].map((t) => [t.name, t.value]));
        return `<code class="tg-value">${escapeHtml(byName.get(`${style}-font-size`))}/${escapeHtml(
          byName.get(`${style}-line-height`)
        )}</code>`;
      }).join("");
      return `<div class="tg-row" style="grid-template-columns: minmax(180px,220px) repeat(${TYPOGRAPHY_MODES.length}, 1fr)">
        <code class="tg-name">${escapeHtml(style)}</code>${cells}
      </div>`;
    })
    .join("");

  const header = `<div class="tg-row" style="grid-template-columns: minmax(180px,220px) repeat(${
    TYPOGRAPHY_MODES.length
  }, 1fr)">
      <strong>style</strong>${TYPOGRAPHY_MODES.map((m) => `<strong>${escapeHtml(m)}</strong>`).join("")}
    </div>`;

  return page(
    "Mode comparison",
    "size/leading for every style across all three platform modes. Cells that differ are where a " +
      "platform deliberately diverges.",
    `<div class="tg-rows">${header}${rows}</div>`,
    TYPOGRAPHY_MODES.reduce((n, m) => n + typographyByMode[m].length, 0)
  );
};

export const Primitives = () => {
  const families = startingWith("font-family-");
  const sizes = startingWith("font-size-");
  const weights = startingWith("font-weight-");
  const leading = startingWith("line-height-");
  const list = (label, tokens) =>
    tokens.length
      ? `<h2>${label}</h2><div class="tg-rows">${tokens
          .map(
            (t) =>
              `<div class="tg-row" style="grid-template-columns: minmax(200px,260px) 1fr">
                 <code class="tg-name">--${escapeHtml(t.name)}</code>
                 <code class="tg-value">${escapeHtml(t.value)}</code>
               </div>`
          )
          .join("")}</div>`
      : "";

  return page(
    "Type primitives",
    "The raw values the ramp is assembled from.",
    list("Family", families) + list("Size", sizes) + list("Weight", weights) + list("Line height", leading),
    families.length + sizes.length + weights.length + leading.length
  );
};
