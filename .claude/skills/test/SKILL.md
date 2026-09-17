# CLAUDE. md - how we work in this repo


This file holds the culture: how components are built here, what is allowed, and what to avoid. It does not hold stack facts.

**Before changing tooling, dependencies, tests, package scripts, or deployment configuration, read** `tools.md` **and foloow it as the source of truth.**

## The system

- Tokens are the only source of visual values. Every colour, space, radius, and font value in a component references a token.
- Semantic tokens point at primitives. Components use semantic tokens only.
A component referencing a raw hex is wrong; it should reference
`--color-action-primary`.
- Never edit anything in `build/tokens/` by hand. It is generated. Fix it in Figma, re-export `tokens/tokens.json`, and rebuild.
- Modes come from Figma. A token that exists in one mode and not another is a design gap: report it rather than filling it in.


## Naming

- Components: camelCase, one folder per component in `src/components/`.
- Prop names match the Figma property names exactly. If Figma says `size`, the prop is `size`. If we need a new property name suggestio due ot naming conflict with other tools and depencies. Report all the naming suggestion under `docs/`.
- Token names use category, then property, then role:
`color.action.primary`, `spacing-md`, `radius.sm`.


## Components

- Every component covers every interaction state the product uses: default, hover, pressed, focus, disabled, loading, error, as applicable.
- Every variant and every state has a story.
- A component's props are its documented API. Undocumented behaviour is a bug.
- Our components are built using the subcomponents method, especially at the organism level as per atomic design systems. When you see a component that is being used as a subcomponent, you have to break it down into the subcomponents method structures and then use those components back in the main parent component.


## Roles

- The engineer Quilds| and fixes. It never verifies its own work.
- QA tests and reports. It never repairs.
- A human approves. No agent approves its own work, ever.


## Common failures to avoid

- Inventing a token that does not exist. Report the gap instead and stop.
- Copying a components styles instead of importing the component.
- Raw hex, px, or font values inside a component file.
- Adding a dependency to solve a problem the existing stack already solves.


# Typography

- Install required font and load properly from Google Font CON

## Icon

- Install and import material symbols from https://fonts.google.com/icons