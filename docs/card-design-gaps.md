# Card (264:494) — design gaps

Raised, not filled in, per `CLAUDE.md` ("a token that exists in one mode and not
another is a design gap: report it rather than filling it in").

Updated 17 Sep, after the token export was fixed and rebuilt (390 tokens).

## Resolved

- **The token build works again.** It had failed since the 16 Sep re-export with
  10 circular `core`/`semantic` aliases on `border-radius-*` and
  `border-width-*`. `npm run storybook` runs.
- **The badge reads correctly.** A new `color-bg-info-dark` (`#1e3a8a`) now
  carries the navy, and `color-bg-info-light` is back to the pale `#eff6ff`. The
  card's Info/Fill badge binds `bg-info-dark` with `text-info-foreground`, and
  matches the Figma node exactly.
- **Rating, description and negative colours** all now match the node
  (`#fb6514`, `#778788`, `#c70036`).

## 1. The semantic layer for radius and border width was deleted

The collision was resolved by removing the semantic aliases rather than
namespacing the collections. Gone:

`border-radius-control` `border-radius-surface` `border-radius-pill`
`border-radius-input` `border-radius-modal` `border-radius-avatar`
`border-width-control` `border-width-focused` `border-width-selected`
`border-width-divider`

Only the core scale ships now — `border-radius-none|xs|sm|default|md|lg|circle`
and `border-width-none|thin|default|thick`.

`CLAUDE.md` says "Semantic tokens point at primitives. Components use semantic
tokens only." **There is no longer a semantic token to use for either
property**, so the Card components reference core directly and are annotated
where they do. This is a regression in the system, not a choice made here:

| Component wants | Used to bind | Binds now (core) |
|---|---|---|
| card corner | `border-radius-surface` | `border-radius-md` |
| media corner | `border-radius-control` | `border-radius-default` |
| icon button | `border-radius-pill` | `border-radius-circle` |
| control stroke | `border-width-control` | `border-width-default` |
| focus ring | `border-width-focused` | `border-width-thick` |

Restoring those aliases is a one-line change per token in Figma and needs no
code change beyond swapping the names back.

## 2. Semantic elevation became core elevation

`horizon-semantic-elevation-raised|overlay|modal` are gone, replaced by
`horizon-elevation-level-1|2|3`. The card's hover shadow now binds
`horizon-elevation-level-2`. Same values, but the names no longer say what the
elevation is *for*, so a component has to know that "level 2" means "overlay".

## 3. The design binds core tokens where semantic ones do exist

For spacing and radius the Figma node reaches past the semantic layer. The build
uses the semantic equivalent — same value, correct layer.

| Where | Figma binds | Build uses |
|---|---|---|
| CardContainer padding | `horizon-core-spacing-md` / `-sm` | `spacing-padding-lg` / `-md` |
| CardLayout gap | `horizon-core-spacing-xs` | `spacing-gap-sm` |
| CardText gaps | `horizon-core-spacing-sm` / `-base` / `-none` | `spacing-gap-md` / `-xs` / `-none` |

## 4. Unbound text styles

Five strings use raw Inter with `line-height: normal` through the Figma styles
`small`, `Body/Semibold` and `Body/L/Semibold`, none of which are tokens:
`(318 reviews)`, `121 EUR`, `per night`, and both texterror strings. Bound to
the nearest semantic type token (`body-sm`, `body-base-semibold`, `body-lg`), so
line height differs from the design's `normal`.

## 5. Values with no token to bind to

No size scale exists, so these are named locals in each component's CSS:
`259px` `246px` `138px` `134px` `136px` `104px` `124px` `168px` `192px` `256px`
`274px` `100px` `269px` `71px` `37px` `42px` `32px` `20px` — plus `10px`, used
as a gap in texterror and the Horizontal/Center stacks, which has no step on the
spacing scale at all (0, 4, 8, 12, 16, 24, 32).

## 6. Components this card needs that do not exist

- **Badge** (233:3729) — 6 themes x 2 types x 3 sizes x 2 only-text = 72 variants
- **IconButton** (215:4173)
- **Link** (236:4283)

CardImage and CardText expose them as slots (`badge`, `overlayAction`, `link`)
rather than copying their styling in. The stories fill those from
`src/components/card/__fixtures__/slotFixtures.tsx`, which is story-only. Each
needs its own build, and the fixtures deleted once they land.
