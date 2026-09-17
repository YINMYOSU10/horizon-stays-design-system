import type { ReactNode } from "react";
import "./cardText.css";

export type CardTextType = "textavailable" | "textlabel" | "texterror";

export type CardTextProps = {
  /** Figma: Type */
  type?: CardTextType;
  /** Figma: showDescription */
  showDescription?: boolean;
  /** Figma: showMetadata */
  showMetadata?: boolean;
  /** Figma: showReview */
  showReview?: boolean;
  /** Figma: showCost */
  showCost?: boolean;
  /** Figma: showPrice */
  showPrice?: boolean;
  /** Figma: showNightCount */
  showNightCount?: boolean;
  /** Figma: showLink */
  showLink?: boolean;

  /* textavailable content */
  title?: string;
  description?: string;
  rating?: string;
  reviewCount?: string;
  price?: string;
  nightCount?: string;
  /** Link instance. CardText owns placement; Link (236:4283) owns its own look. */
  link?: ReactNode;

  /* textlabel content */
  label?: string;
  value?: string;
  caption?: string;

  /* texterror content */
  errorMessage?: string;
  errorValue?: string;

  /** Centre the heading block — CardLayout's Center orientation uses this. */
  align?: "start" | "center";
  className?: string;
};

export function CardText({
  type = "textavailable",
  showDescription = true,
  showMetadata = true,
  showReview = true,
  showCost = true,
  showPrice = true,
  showNightCount = true,
  showLink = true,
  title = "Casa do Bairro",
  description = "Alfama, Lisbon · 1.2 km from centre",
  rating = "4.7",
  reviewCount = "(318 reviews)",
  price = "121 EUR",
  nightCount = "per night",
  link,
  label = "Label",
  value = "0",
  caption = "vs last week",
  errorMessage = "No rooms left for these dates",
  errorValue = "—",
  align = "start",
  className
}: CardTextProps) {
  const classes = ["cardText"];
  if (align === "center") classes.push("cardText--center");
  if (className) classes.push(className);

  return (
    <div className={classes.join(" ")} data-type={type} data-node-id="224:5498">
      {type === "textavailable" && (
        <>
          <div className="cardText__heading">
            <p className="cardText__title">{title}</p>
            {showDescription && <p className="cardText__description">{description}</p>}
          </div>

          {showMetadata && (
            <div className="cardText__metadata">
              {showReview && (
                <div className="cardText__review">
                  <p className="cardText__rating">{rating}</p>
                  <p className="cardText__reviewCount">{reviewCount}</p>
                </div>
              )}
              {showCost && (
                <div className="cardText__cost">
                  {showPrice && <p className="cardText__price">{price}</p>}
                  {showNightCount && <p className="cardText__nightCount">{nightCount}</p>}
                  {showLink && link ? <div className="cardText__link">{link}</div> : null}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {type === "textlabel" && (
        <>
          <p className="cardText__label">{label}</p>
          <p className="cardText__value">{value}</p>
          <p className="cardText__caption">{caption}</p>
        </>
      )}

      {type === "texterror" && (
        <>
          <p className="cardText__errorMessage">{errorMessage}</p>
          <p className="cardText__errorValue">{errorValue}</p>
        </>
      )}
    </div>
  );
}

export default CardText;
