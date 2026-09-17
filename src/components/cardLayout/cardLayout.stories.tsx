/**
 * Figma node: https://www.figma.com/design/GeEJOuA2aaH0o6S3v8MOK0/Horizon.Global.Components.v1.0.0.In-Progress?node-id=220-4971
 * CardLayout — Orientation (Vertical | Horizontal | Center)
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardLayout } from "./cardLayout";
import { CardImage } from "../cardImage/cardImage";
import { CardText } from "../cardText/cardText";
import { BadgeFixture, IconButtonFixture, LinkFixture } from "../card/__fixtures__/slotFixtures";
import stay from "../card/__fixtures__/stay.png";

const image = (
  <CardImage
    src={stay}
    alt="Casa do Bairro"
    badge={<BadgeFixture />}
    overlayAction={<IconButtonFixture />}
  />
);

const meta = {
  title: "Components/CardLayout",
  component: CardLayout,
  parameters: { layout: "centered" },
  args: { image, text: <CardText link={<LinkFixture />} /> }
} satisfies Meta<typeof CardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = { name: "Orientation=Vertical", args: { orientation: "Vertical" } };
export const Horizontal: Story = { name: "Orientation=Horizontal", args: { orientation: "Horizontal" } };
export const Center: Story = {
  name: "Orientation=Center",
  args: { orientation: "Center", text: <CardText align="center" link={<LinkFixture />} /> }
};

export const NoCardImage: Story = { name: "showCardImage=false", args: { showCardImage: false } };
export const NoSlot: Story = { name: "showSlot=false", args: { showSlot: false } };
