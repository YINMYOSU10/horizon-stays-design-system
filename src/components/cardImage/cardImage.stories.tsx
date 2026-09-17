/**
 * Figma node: https://www.figma.com/design/GeEJOuA2aaH0o6S3v8MOK0/Horizon.Global.Components.v1.0.0.In-Progress?node-id=218-4235
 * CardImage — State (Default | Hover) x Ratio (3:2 | 1:1)
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardImage } from "./cardImage";
import { BadgeFixture, IconButtonFixture } from "../card/__fixtures__/slotFixtures";
import stay from "../card/__fixtures__/stay.png";

const meta = {
  title: "Components/CardImage",
  component: CardImage,
  parameters: { layout: "centered" },
  args: {
    src: stay,
    alt: "Casa do Bairro",
    badge: <BadgeFixture />,
    overlayAction: <IconButtonFixture />
  }
} satisfies Meta<typeof CardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultRatio32: Story = {
  name: "State=Default, Ratio=3:2",
  args: { state: "Default", ratio: "3:2" }
};

export const HoverRatio32: Story = {
  name: "State=Hover, Ratio=3:2",
  args: { state: "Hover", ratio: "3:2" }
};

export const DefaultRatio11: Story = {
  name: "State=Default, Ratio=1:1",
  args: { state: "Default", ratio: "1:1" }
};

export const HoverRatio11: Story = {
  name: "State=Hover, Ratio=1:1",
  args: { state: "Hover", ratio: "1:1" }
};

export const NoBadge: Story = {
  name: "showBadge=false",
  args: { showBadge: false }
};

export const NoOverlayAction: Story = {
  name: "showOverlayAction=false",
  args: { showOverlayAction: false }
};

/** `state` unset — the real `:hover` drives the scrim. Hover it to check. */
export const LiveHover: Story = {
  name: "Live hover (state unset)",
  args: {}
};
