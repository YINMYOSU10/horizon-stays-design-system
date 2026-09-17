import { createElement, useEffect, useRef } from "react";

// Every story in this folder is driven by the *built* stylesheets, parsed at
// load time. Nothing here hand-lists a token name, so a Figma re-export shows
// up in the gallery automatically after `npm run build-tokens` — including
// tokens that were added or removed.
import tokensCss from "../build/css/tokens.css?raw";
import webCss from "../build/css/typography.web.css?raw";
import mobileCss from "../build/css/typography.mobile.css?raw";
import backOfficeCss from "../build/css/typography.back-office.css?raw";

const DECL = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;

/** Parse `--name: value;` pairs out of a stylesheet, in source order. */
function parse(css) {
  const out = [];
  for (const [, name, rawValue] of css.matchAll(DECL)) {
    // Style Dictionary appends `/** ... */` descriptions after the value.
    const value = rawValue.replace(/\/\*[\s\S]*?\*\//g, "").trim();
    const comment = rawValue.match(/\/\*+([\s\S]*?)\*\//);
    out.push({
      name,
      value,
      description: comment ? comment[1].trim() : null
    });
  }
  return out;
}

export const allTokens = parse(tokensCss);

export const typographyByMode = {
  web: parse(webCss),
  mobile: parse(mobileCss),
  "back-office": parse(backOfficeCss)
};

export const TYPOGRAPHY_MODES = Object.keys(typographyByMode);

/** Tokens whose name starts with any of the given prefixes. */
export function startingWith(...prefixes) {
  return allTokens.filter((t) => prefixes.some((p) => t.name.startsWith(p)));
}

/** Tokens matching a predicate on the name. */
export function where(predicate) {
  return allTokens.filter((t) => predicate(t.name, t.value));
}

/**
 * Split `color-teal-500` into { family: "teal", step: "500" } so a palette can
 * be laid out as ramps without hard-coding which families exist.
 */
export function ramps(tokens, stripPrefix) {
  const families = new Map();
  for (const token of tokens) {
    const rest = token.name.slice(stripPrefix.length);
    const idx = rest.lastIndexOf("-");
    if (idx === -1) continue;
    const family = rest.slice(0, idx);
    const step = rest.slice(idx + 1);
    if (!families.has(family)) families.set(family, []);
    families.get(family).push({ ...token, step });
  }
  return families;
}

/**
 * Group semantic tokens by their role segment: `color-text-positive-default`
 * groups under "positive". Falls back to the first segment after the prefix.
 */
export function groupByRole(tokens, prefix) {
  const groups = new Map();
  for (const token of tokens) {
    const rest = token.name.slice(prefix.length);
    const role = rest.split("-")[0];
    if (!groups.has(role)) groups.set(role, []);
    groups.get(role).push(token);
  }
  return groups;
}

export const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Mount raw HTML or a live DOM node as a React element.
 *
 * Storybook runs the react-vite framework now (the component library needs it),
 * but these token stories were written against the html renderer and build
 * their markup as strings. Rather than rewrite seven gallery files, they hand
 * that markup to React through here.
 */
export function mount(content) {
  return createElement(function TokenGallery() {
    const ref = useRef(null);
    useEffect(() => {
      const host = ref.current;
      if (!host) return;
      host.replaceChildren();
      if (typeof content === "string") host.innerHTML = content;
      else if (content instanceof Node) host.appendChild(content);
    }, []);
    return createElement("div", { ref });
  });
}

/** The markup for a page, as a string. Used where a DOM node is built by hand. */
export function pageHtml(title, lede, body, count) {
  return `
    <div class="tg">
      <h1>${escapeHtml(title)}${
        count != null ? `<span class="tg-count">${count} tokens</span>` : ""
      }</h1>
      ${lede ? `<p class="tg-lede">${lede}</p>` : ""}
      ${body}
    </div>`;
}

/** A page wrapper shared by every story. */
export function page(title, lede, body, count) {
  return mount(pageHtml(title, lede, body, count));
}

/** A grid of colour chips. */
export function swatchGrid(tokens) {
  return `<div class="tg-grid">${tokens
    .map(
      (t) => `
      <div class="tg-swatch">
        <div class="tg-swatch-chip" style="--tg-chip: var(--${t.name})"></div>
        <div class="tg-swatch-meta">
          <code class="tg-name">--${escapeHtml(t.name)}</code>
          <code class="tg-value">${escapeHtml(t.value)}</code>
        </div>
      </div>`
    )
    .join("")}</div>`;
}

/** Parse a hex or rgb()/rgba() colour into [r,g,b] 0-255, or null. */
export function toRgb(value) {
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (hex) {
    const h = hex[1].length === 3 ? hex[1].replace(/./g, (c) => c + c) : hex[1];
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const rgb = /rgba?\(([^)]+)\)/i.exec(value);
  if (rgb) {
    const parts = rgb[1].split(/[\s,/]+/).filter(Boolean).slice(0, 3);
    return parts.map((p) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p)));
  }
  return null;
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
export function luminance(value) {
  const rgb = toRgb(value);
  if (!rgb) return 1;
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two colour values. */
export function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export const INK_DARK = "#212a2b";  // --color-text-neutral-primary
export const INK_LIGHT = "#ffffff"; // --color-text-neutral-inverse

/**
 * Pick a readable ink for a swatch by measuring both candidates against it and
 * taking the higher contrast. A step-number rule ("500 and up gets white")
 * gets yellow-500 and blue-500 wrong in opposite directions, and a single
 * luminance threshold still strands the mid-tones.
 */
export function inkOn(value) {
  return contrast(value, INK_LIGHT) >= contrast(value, INK_DARK) ? INK_LIGHT : INK_DARK;
}

/** True when the best available ink still falls short of WCAG AA body text. */
export function isLowContrast(value) {
  return contrast(value, inkOn(value)) < 4.5;
}
