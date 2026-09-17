/**
 * Figma node: https://www.figma.com/design/GeEJOuA2aaH0o6S3v8MOK0/Horizon.Global.Components.v1.0.0.In-Progress?node-id=224-5498
 * CardText — Type (textavailable | textlabel | texterror)
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardText } from "./cardText";
import { LinkFixture } from "../card/__fixtures__/slotFixtures";

const meta = {
  title: "Components/CardText",
  component: CardText,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { link: <LinkFixture /> }
} satisfies Meta<typeof CardText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAvailable: Story = {
  name: "Type=textavailable",
  args: { type: "textavailable" }
};

export const TextLabel: Story = {
  name: "Type=textlabel",
  args: { type: "textlabel" }
};

export const TextError: Story = {
  name: "Type=texterror",
  args: { type: "texterror" }
};

export const NoDescription: Story = { name: "showDescription=false", args: { showDescription: false } };
export const NoMetadata: Story = { name: "showMetadata=false", args: { showMetadata: false } };
export const NoReview: Story = { name: "showReview=false", args: { showReview: false } };
export const NoCost: Story = { name: "showCost=false", args: { showCost: false } };
export const NoPrice: Story = { name: "showPrice=false", args: { showPrice: false } };
export const NoNightCount: Story = { name: "showNightCount=false", args: { showNightCount: false } };
export const NoLink: Story = { name: "showLink=false", args: { showLink: false } };
