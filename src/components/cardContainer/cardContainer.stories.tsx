/**
 * Figma node: https://www.figma.com/design/GeEJOuA2aaH0o6S3v8MOK0/Horizon.Global.Components.v1.0.0.In-Progress?node-id=215-4091
 * CardContainer — State (Default | Hover)
 */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardContainer } from "./cardContainer";

const meta = {
  title: "Components/CardContainer",
  component: CardContainer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    children: <div style={{ width: 269, height: 100 }} />
  }
} satisfies Meta<typeof CardContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: "State=Default", args: { state: "Default" } };
export const Hover: Story = { name: "State=Hover", args: { state: "Hover" } };

/** `state` unset — real `:hover` and keyboard focus raise the elevation. */
export const LiveHover: Story = { name: "Live hover (state unset)", args: {} };
