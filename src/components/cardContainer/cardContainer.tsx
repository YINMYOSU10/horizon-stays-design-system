import type { ReactNode } from "react";
import "./cardContainer.css";

export type CardContainerState = "Default" | "Hover";

export type CardContainerProps = {
  /** Figma: State. Omit to let real `:hover` drive it; set to force the state. */
  state?: CardContainerState;
  children?: ReactNode;
  className?: string;
};

export function CardContainer({ state, children, className }: CardContainerProps) {
  return (
    <div
      className={className ? `cardContainer ${className}` : "cardContainer"}
      data-state={state}
      data-node-id="215:4091"
    >
      {children}
    </div>
  );
}

export default CardContainer;
