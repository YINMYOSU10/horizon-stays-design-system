/**
 * Figma node: https://www.figma.com/design/GeEJOuA2aaH0o6S3v8MOK0/Horizon.Global.Components.v1.0.0.In-Progress?node-id=264-494
 * Card — composition of CardContainer + CardLayout + CardImage + CardText.
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";
import { BadgeFixture, IconButtonFixture, LinkFixture } from "./__fixtures__/slotFixtures";
import stay from "./__fixtures__/stay.png";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    src: stay,
    alt: "Casa do Bairro",
    badge: <BadgeFixture />,
    overlayAction: <IconButtonFixture />,
    link: <LinkFixture />
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The node as given: CardContainer State=Hover, Vertical, textavailable. */
export const Node264494: Story = {
  name: "Card (264:494) — State=Hover",
  args: { state: "Hover", orientation: "Vertical", type: "textavailable" }
};

export const StateDefault: Story = { name: "State=Default", args: { state: "Default" } };
export const OrientationHorizontal: Story = { name: "Orientation=Horizontal", args: { orientation: "Horizontal" } };
export const OrientationCenter: Story = { name: "Orientation=Center", args: { orientation: "Center" } };
export const TypeTextLabel: Story = { name: "Type=textlabel", args: { type: "textlabel" } };
export const TypeTextError: Story = { name: "Type=texterror", args: { type: "texterror" } };
export const Ratio11: Story = { name: "Ratio=1:1", args: { ratio: "1:1" } };
export const ImageStateHover: Story = { name: "CardImage State=Hover", args: { imageState: "Hover" } };

/** Nothing forced — hover the card to see elevation and the media scrim. */
export const LiveHover: Story = { name: "Live hover (nothing forced)", args: {} };
