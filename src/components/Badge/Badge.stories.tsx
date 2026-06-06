import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const VARIANTS = ["default", "primary", "success", "warning", "danger", "neutral"] as const;
const SIZES = ["sm", "md"] as const;
const STYLES = ["solid", "soft"] as const;

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    style: { control: "inline-radio", options: STYLES },
    children: { control: "text" },
  },
  args: {
    variant: "default",
    size: "sm",
    style: "solid",
    children: "Badge",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Primary: Story = { args: { variant: "primary", children: "NEW" } };
export const Success: Story = { args: { variant: "success", children: "Verified" } };
export const Warning: Story = { args: { variant: "warning", children: "Beta" } };
export const Danger: Story = { args: { variant: "danger", children: "3" } };
export const Neutral: Story = { args: { variant: "neutral", children: "Sold out" } };

export const Soft: Story = { args: { style: "soft", variant: "primary", children: "Soft" } };

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {STYLES.map((style) => (
        <div key={style} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          <span style={{ width: "3rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
            {style}
          </span>
          {VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant} style={style}>
              {variant}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const FullMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>size={size}</div>
          {STYLES.map((style) => (
            <div key={style} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
              {VARIANTS.map((variant) => (
                <Badge key={variant} variant={variant} size={size} style={style}>
                  {variant}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const AccessibleCount: Story = {
  args: {
    variant: "danger",
    size: "sm",
    style: "solid",
    "aria-label": "3 unread notifications",
    children: "3",
  },
};

export const LongText: Story = {
  args: {
    variant: "neutral",
    style: "soft",
    size: "md",
    children: "Very long badge label",
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <Badge variant="primary" style="soft" size="sm">NEW</Badge>
        <span>신규 상품 라벨</span>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <Badge variant="success" style="solid" size="sm">Verified</Badge>
        <span>인증 완료</span>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <Badge variant="warning" style="soft" size="md">Beta</Badge>
        <span>베타 기능</span>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <Badge variant="danger" style="solid" size="sm">3</Badge>
        <span>읽지 않은 알림</span>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <Badge variant="neutral" style="soft" size="md">Sold out</Badge>
        <span>품절</span>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {STYLES.map((style) => (
        <div key={style} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          <span style={{ width: "3rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
            {style}
          </span>
          {VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant} style={style}>
              {variant}
            </Badge>
          ))}
        </div>
      ))}
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
