import type { ReactNode } from "react";
import { CardContainer, type CardContainerState } from "../cardContainer/cardContainer";
import { CardLayout, type CardLayoutOrientation } from "../cardLayout/cardLayout";
import { CardImage, type CardImageRatio, type CardImageState } from "../cardImage/cardImage";
import { CardText, type CardTextProps, type CardTextType } from "../cardText/cardText";
import "./card.css";

export type CardProps = {
  /** Figma: CardContainer / State */
  state?: CardContainerState;
  /** Figma: CardLayout / Orientation */
  orientation?: CardLayoutOrientation;
  /** Figma: CardImage / Ratio */
  ratio?: CardImageRatio;
  /** Figma: CardImage / State */
  imageState?: CardImageState;
  /** Figma: CardText / Type */
  type?: CardTextType;

  /* visibility toggles, named as the Figma properties are */
  showCardImage?: boolean;
  showSlot?: boolean;
  showBadge?: boolean;
  showOverlayAction?: boolean;

  /** Media source — sample content in the design, a prop here. */
  src: string;
  alt?: string;

  /** Slots for components this card composes but does not own. */
  badge?: ReactNode;
  overlayAction?: ReactNode;
  link?: ReactNode;
  slot?: ReactNode;
  slot2?: ReactNode;

  /** Content forwarded to CardText. */
  text?: Omit<CardTextProps, "type" | "link" | "align">;
  className?: string;
};

export function Card({
  state,
  orientation = "Vertical",
  ratio = "3:2",
  imageState,
  type = "textavailable",
  showCardImage = true,
  showSlot = true,
  showBadge = true,
  showOverlayAction = true,
  src,
  alt = "",
  badge,
  overlayAction,
  link,
  slot,
  slot2,
  text,
  className
}: CardProps) {
  return (
    <div className={className ? `card ${className}` : "card"} data-node-id="264:494">
      <CardContainer state={state}>
        <CardLayout
          orientation={orientation}
          showCardImage={showCardImage}
          showSlot={showSlot}
          image={
            <CardImage
              src={src}
              alt={alt}
              ratio={ratio}
              state={imageState}
              showBadge={showBadge}
              showOverlayAction={showOverlayAction}
              badge={badge}
              overlayAction={overlayAction}
            />
          }
          text={
            <CardText
              {...text}
              type={type}
              link={link}
              align={orientation === "Center" ? "center" : "start"}
            />
          }
          slot={slot}
          slot2={slot2}
        />
      </CardContainer>
    </div>
  );
}

export default Card;
