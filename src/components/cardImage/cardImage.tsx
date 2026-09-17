import type { ReactNode } from "react";
import "./cardImage.css";

export type CardImageRatio = "3:2" | "1:1";
export type CardImageState = "Default" | "Hover";

export type CardImageProps = {
  /** Media source. The design's photo is sample content, not part of the component. */
  src: string;
  alt?: string;
  /** Figma: Ratio */
  ratio?: CardImageRatio;
  /** Figma: State. Omit to let real `:hover` drive it; set to force the state. */
  state?: CardImageState;
  /** Figma: showBadge */
  showBadge?: boolean;
  /** Figma: showOverlayAction */
  showOverlayAction?: boolean;
  /** Badge instance to place top-left. CardImage owns the position, not the look. */
  badge?: ReactNode;
  /** IconButton instance to place top-right. */
  overlayAction?: ReactNode;
  className?: string;
};

export function CardImage({
  src,
  alt = "",
  ratio = "3:2",
  state,
  showBadge = true,
  showOverlayAction = true,
  badge,
  overlayAction,
  className
}: CardImageProps) {
  return (
    <div
      className={className ? `cardImage ${className}` : "cardImage"}
      data-ratio={ratio}
      data-state={state}
      data-node-id="218:4235"
    >
      <img className="cardImage__media" src={src} alt={alt} />
      <span className="cardImage__scrim" aria-hidden="true" />
      {showBadge && badge ? <div className="cardImage__badge">{badge}</div> : null}
      {showOverlayAction && overlayAction ? (
        <div className="cardImage__action">{overlayAction}</div>
      ) : null}
    </div>
  );
}

export default CardImage;
