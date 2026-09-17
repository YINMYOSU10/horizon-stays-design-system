# Card (264:494) — design gaps

Raised, not filled in, per `CLAUDE.md` ("a token that exists in one mode and not
another is a design gap: report it rather than filling it in").

## 1. The token build is broken — blocks everything downstream

`npm run build-tokens` has failed since the tokens were re-exported on 16 Sep.
`horizon-core` and `horizon-semantic` both declare `border-radius-*` and
`border-width-*`. The build merges every collection into one flat namespace, so
semantic's alias to the core token resolves to itself:

```
Collision detected at: border-radius-none! New value: {border-radius-none}
Circular definition cycle for {border-radius-none} => {border-radius-none}
```

Ten tokens: `border-radius-none|xs|sm|md|lg|circle`, `border-width-none|thin|default|thick`.

The committed `build/css/tokens.css` is therefore **stale output from before that
export**. Everything in Storybook renders against those old values.

Figma's own variable names are already namespaced — `--horizon-core-border-radius-none`
vs `--horizon-semantic-border-radius-none` — so the fix is to carry the collection
prefix through the build. That renames every generated custom property, which
breaks every component and the token gallery, so it is a decision for whoever
owns the pipeline, not a side effect of a component build.

## 2. Stale values visible in the Card right now

| Token | Figma | Built CSS | Effect on the card |
|---|---|---|---|
| `color-bg-info-light` | `#1e3a8a` | `#eff6ff` | **Badge is white-on-white — unreadable** |
| `color-text-update-default` | `#fb6514` | `#c4320a` | Rating reads brick, not orange |
| `color-text-neutral-tertiary` | `#778788` | `#5c6b6c` | Description slightly too dark |
| `color-bg-negative-default` | `#c70036` | `#b42318` | — |
| `label-line-height` | `12` | `16px` | Badge text sits looser |

The components reference the token, so all five correct themselves once the
export builds. No component change needed.

## 3. The design binds core tokens where semantic ones exist

`CLAUDE.md`: "Components use semantic tokens only." The Figma node binds the
base layer directly in these places. The build uses the semantic equivalent —
same value, correct layer — and the design should be rebound to match.

| Where | Figma binds | Should bind |
|---|---|---|
| CardContainer padding | `horizon-core-spacing-md` / `-sm` | `spacing-padding-lg` / `-md` |
| CardContainer radius | `horizon-core-border-radius-md` | `border-radius-surface` |
| CardContainer shadow | `horizon/elevation/level 2` | `horizon-semantic-elevation-overlay` |
| CardLayout gap | `horizon-core-spacing-xs` | `spacing-gap-sm` |
| CardImage radius | `horizon-core-border-radius-default` | `border-radius-control` |
| CardText gaps | `horizon-core-spacing-sm` / `-base` / `-none` | `spacing-gap-md` / `-xs` / `-none` |

The IconButton inside CardImage already binds semantic tokens correctly, which
is what the rest should look like.

## 4. Unbound text styles

Five strings use raw Inter with `line-height: normal` through the Figma styles
`small`, `Body/Semibold` and `Body/L/Semibold`, none of which are tokens:

- `(318 reviews)` — Inter Regular 12
- `121 EUR` — Inter Semi Bold 14
- `per night` — Inter Regular 12
- texterror message — Inter Regular 12
- texterror value (`—`) — Inter Semi Bold 16

Bound to the nearest semantic type token in the build (`body-sm`,
`body-base-semibold`, `body-lg`). Line height therefore differs from the design,
which uses `normal`. Needs either a token or a decision to keep them raw.

## 5. Values with no token to bind to

The system has no size scale, so these are named locals in each component's CSS
rather than inline numbers. They need tokens, or a decision that dimensions stay
untokenised.

`259px` `246px` `138px` `134px` `136px` `104px` `124px` `168px` `192px` `256px`
`274px` `100px` `269px` `71px` `37px` `42px` `32px` `20px` — and `10px`, used as
a gap in texterror and in the Horizontal/Center stacks, which has no step on the
spacing scale at all (it goes 0, 4, 8, 12, 16, 24, 32).

## 6. Components this card needs that do not exist

Card composes three components that have no code yet:

- **Badge** (233:3729) — 6 themes x 2 types x 3 sizes x 2 only-text = 72 variants
- **IconButton** (215:4173)
- **Link** (236:4283)

Rather than copy their styling into Card (a `CLAUDE.md` "common failure"),
CardImage and CardText expose them as slots: `badge`, `overlayAction`, `link`.
The stories fill those slots from `src/components/card/__fixtures__/slotFixtures.tsx`,
which is clearly marked story-only. **Each of the three needs its own build, and
the fixtures deleted once they land.**
