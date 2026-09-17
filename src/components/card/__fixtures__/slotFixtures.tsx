/* STORY FIXTURES — not components, not part of the library API.
 *
 * Card composes Badge (233:3729), IconButton, and Link (236:4283). None of the
 * three exist in `src/components/` yet, and each has its own variant set worth
 * a build of its own — Badge alone is 6 themes x 2 types x 3 sizes x 2. These
 * stand-ins exist so the Card stories can show the slots filled, matching the
 * Figma node. Replace every one of them with the real component once it ships;
 * nothing outside these stories should import this file.
 */
import favoriteIcon from "../../../assets/icons/favorite.svg";
import "./slotFixtures.css";

export function BadgeFixture({ children = "Confirm" }: { children?: string }) {
  return <span className="fixtureBadge">{children}</span>;
}

export function IconButtonFixture({ label = "Save to favourites" }: { label?: string }) {
  return (
    <button type="button" className="fixtureIconButton" aria-label={label}>
      <img src={favoriteIcon} alt="" width={20} height={20} />
    </button>
  );
}

export function LinkFixture({ children = "text label" }: { children?: string }) {
  return (
    <a className="fixtureLink" href="#card-link">
      {children}
    </a>
  );
}
