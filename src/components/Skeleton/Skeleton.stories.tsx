import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const VARIANTS = ["text", "circular", "rectangular"] as const;
const SIZES = ["sm", "md", "lg"] as const;
const ANIMATIONS = ["pulse", "wave", "none"] as const;

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    animation: { control: "inline-radio", options: ANIMATIONS },
  },
  args: {
    variant: "text",
    size: "md",
    animation: "pulse",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Text: Story = { args: { variant: "text" } };
export const Circular: Story = { args: { variant: "circular" } };
export const Rectangular: Story = { args: { variant: "rectangular" } };

export const Wave: Story = { args: { animation: "wave" } };
export const None: Story = { args: { animation: "none" } };

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>{variant}</div>
          <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
            {SIZES.map((size) => (
              <Skeleton key={size} variant={variant} size={size} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AnimationMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {ANIMATIONS.map((animation) => (
        <div key={animation} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>{animation}</div>
          <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
            <Skeleton variant="text" animation={animation} />
            <Skeleton variant="circular" animation={animation} />
            <Skeleton variant="rectangular" animation={animation} />
          </div>
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <div style={{ width: "32rem" }}><Story /></div>],
};

export const UserCard: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center", width: "20rem" }}>
      <Skeleton variant="circular" size="md" />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", flex: 1 }}>
        <Skeleton variant="text" size="md" />
        <Skeleton variant="text" size="sm" />
      </div>
    </div>
  ),
};

export const ImageCard: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", width: "16rem" }}>
      <Skeleton variant="rectangular" size="lg" className="w-full" />
      <Skeleton variant="text" size="md" />
      <Skeleton variant="text" size="sm" className="w-1/2" />
    </div>
  ),
};

export const ArticlePreview: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", width: "24rem" }}>
      <Skeleton variant="text" size="lg" className="w-3/4" />
      <Skeleton variant="text" size="md" />
      <Skeleton variant="text" size="md" />
      <Skeleton variant="text" size="md" className="w-5/6" />
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-sm)" }}>
      {[0, 1, 2, 3].map((i) => (
        <Skeleton key={i} variant="circular" size="sm" />
      ))}
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", width: "24rem" }}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="text" animation="wave" />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "var(--color-neutral-900)" }],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ colorScheme: "dark", padding: "var(--space-lg)" }}>
        <Story />
      </div>
    ),
  ],
};
