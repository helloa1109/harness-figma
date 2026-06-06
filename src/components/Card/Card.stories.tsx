import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const VARIANTS = ["outlined", "elevated", "flat"] as const;
const PADDINGS = ["sm", "md", "lg"] as const;

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    padding: { control: "inline-radio", options: PADDINGS },
    interactive: { control: "boolean" },
  },
  args: {
    variant: "outlined",
    padding: "md",
    children: (
      <div style={{ color: "var(--color-text-primary)" }}>
        <h3 style={{ margin: 0, fontSize: "var(--font-size-base)", fontWeight: 600 }}>Card title</h3>
        <p style={{ margin: "var(--space-xs) 0 0", color: "var(--color-text-secondary)" }}>본문 텍스트</p>
      </div>
    ),
  },
  decorators: [(Story) => <div style={{ width: "20rem" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};
export const Elevated: Story = { args: { variant: "elevated" } };
export const Flat: Story = { args: { variant: "flat" } };
export const Interactive: Story = { args: { variant: "elevated", interactive: true, onClick: () => alert("clicked") } };

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)" }}>
      {VARIANTS.map((variant) => (
        <Card key={variant} variant={variant} padding="md">
          <div style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{variant}</div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>variant={variant}</div>
        </Card>
      ))}
    </div>
  ),
  decorators: [(Story) => <div style={{ width: "48rem" }}><Story /></div>],
};

export const PaddingMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {PADDINGS.map((padding) => (
        <Card key={padding} variant="outlined" padding={padding}>
          <div style={{ color: "var(--color-text-primary)" }}>padding={padding}</div>
        </Card>
      ))}
    </div>
  ),
};

export const TravelDestination: Story = {
  render: () => (
    <Card variant="elevated" padding="md" interactive onClick={() => {}}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
        <div style={{ height: "10rem", borderRadius: "var(--radius-md)", background: "var(--color-neutral-200)" }} />
        <div style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>제주도 3박 4일</div>
        <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>4명 · 5/10–13</div>
        <div style={{ color: "var(--color-brand-700)", fontWeight: 700 }}>₩ 580,000</div>
      </div>
    </Card>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Card variant="outlined" padding="md">
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "var(--radius-full)", background: "var(--color-brand-100)" }} />
        <div>
          <div style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>Jane Doe</div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>12 Trips · 4 Reviews</div>
        </div>
      </div>
    </Card>
  ),
};

export const ListItem: Story = {
  render: () => (
    <Card variant="flat" padding="sm" interactive onClick={() => {}}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "var(--color-text-primary)" }}>설정 항목</div>
        <span style={{ color: "var(--color-text-tertiary)" }}>›</span>
      </div>
    </Card>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <Card variant="elevated" padding="md" interactive onClick={() => {}}>
        <div style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>제주도 3박 4일</div>
        <div style={{ color: "var(--color-text-secondary)" }}>인기 추천</div>
      </Card>
      <Card variant="outlined" padding="md">
        <div style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>User profile</div>
        <div style={{ color: "var(--color-text-secondary)" }}>basic info</div>
      </Card>
      <Card variant="flat" padding="sm" interactive onClick={() => {}}>
        <div style={{ color: "var(--color-text-primary)" }}>List item</div>
      </Card>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)" }}>
      {VARIANTS.map((variant) => (
        <Card key={variant} variant={variant} padding="md">
          <div style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{variant}</div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>dark mode</div>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark", values: [{ name: "dark", value: "var(--color-neutral-900)" }] },
  },
  decorators: [(Story) => <div style={{ colorScheme: "dark", padding: "var(--space-lg)", width: "48rem" }}><Story /></div>],
};
