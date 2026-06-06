import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "시작하기" },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "취소" },
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "md", children: "더보기" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
