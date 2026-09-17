# Card — naming decisions

`CLAUDE.md` asks for naming suggestions to be reported here.

## Prop names

No prop was renamed. Every prop uses the name Figma's own code generation emits
for the component property: `state`, `ratio`, `orientation`, `type`,
`showCardImage`, `showSlot`, `showBadge`, `showOverlayAction`, `showDescription`,
`showMetadata`, `showReview`, `showCost`, `showPrice`, `showNightCount`,
`showLink`.

Figma displays these capitalised in the variant panel (`State`, `Ratio`,
`Orientation`, `Type`). The lower-case forms above are what Figma itself emits,
and they are valid JS identifiers, so they are used verbatim rather than being
re-cased by hand.

Variant *values* keep their exact Figma spelling, including the unusual ones:
`"textavailable"`, `"textlabel"`, `"texterror"` (no separator), and `"3:2"` /
`"1:1"`.

## File names

`CLAUDE.md` says component folders are camelCase; the build skill says
`src/components/<Name>/<Name>.tsx`. Both are satisfied by making `<Name>` the
camelCase folder name, so files are `cardImage/cardImage.tsx`, not
`cardImage/CardImage.tsx`. The exported React component stays PascalCase
(`CardImage`) because JSX requires it.

## Two props added beyond the Figma properties

- `src` / `alt` on CardImage — the photo in the design is sample content, not a
  component property.
- `align` on CardText — CardLayout's `Center` orientation centres the heading
  block. In Figma that is baked into the Center variant's nested instance; in
  code CardText is shared, so the alignment is passed in.
