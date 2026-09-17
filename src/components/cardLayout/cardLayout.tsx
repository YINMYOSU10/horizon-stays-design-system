import type { ReactNode } from "react";
import "./cardLayout.css";

export type CardLayoutOrientation = "Vertical" | "Horizontal" | "Center";

export type CardLayoutProps = {
  /** Figma: Orientation */
  orientation?: CardLayoutOrientation;
  /** Figma: showCardImage */
  showCardImage?: boolean;
  /** Figma: showSlot */
  showSlot?: boolean;
  /** CardImage instance. */
  image?: ReactNode;
  /** CardText instance. */
  text?: ReactNode;
  /** Figma: Slot — free area under the media (Vertical/Center) or the text (Horizontal). */
  slot?: ReactNode;
  /** Figma: Slot2 — Center orientation only, sits below the text block. */
  slot2?: ReactNode;
  className?: string;
};

export function CardLayout({
  orientation = "Vertical",
  showCardImage = true,
  showSlot = true,
  image,
  text,
  slot,
  slot2,
  className
}: CardLayoutProps) {
  const isHorizontal = orientation === "Horizontal";
  const isCenter = orientation === "Center";

  return (
    <div
      className={className ? `cardLayout ${className}` : "cardLayout"}
      data-orientation={orientation}
      data-node-id="220:4971"
    >
      {showCardImage && image}

      {/* Vertical puts the slot directly under the media. */}
      {!isHorizontal && !isCenter && showSlot && <div className="cardLayout__slot">{slot}</div>}
      {!isHorizontal && !isCenter && text}

      {/* Center stacks text then a second, wider slot. */}
      {isCenter && (
        <>
          {showSlot && <div className="cardLayout__slot">{slot}</div>}
          <div className="cardLayout__stack">
            {text}
            {showSlot && <div className="cardLayout__slot2">{slot2}</div>}
          </div>
        </>
      )}

      {/* Horizontal puts the text and its slot in a column beside the media. */}
      {isHorizontal && (
        <div className="cardLayout__stack">
          {text}
          {showSlot && <div className="cardLayout__slot">{slot}</div>}
        </div>
      )}
    </div>
  );
}

export default CardLayout;
