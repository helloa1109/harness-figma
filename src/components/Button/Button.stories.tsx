import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const VARIANTS = ["primary", "secondary", "ghost", "danger"] as const;
const SIZES = ["sm", "md", "lg"] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete" } };

export const Loading: Story = { args: { loading: true, children: "Submitting…" } };
export const Disabled: Story = { args: { disabled: true } };

export const WithLeftIcon: Story = {
  args: { leftIcon: <PlusIcon />, children: "Add" },
};
export const WithRightIcon: Story = {
  args: { rightIcon: <ArrowIcon />, children: "Next" },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: "Full width button" },
  decorators: [(Story) => <div style={{ width: "20rem" }}><Story /></div>],
};

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          <span style={{ width: "2rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>{size}</span>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size={size}>{variant}</Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const StateMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <Button>Default</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" loading>Loading</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <Button variant="danger">Default</Button>
        <Button variant="danger" loading>Loading</Button>
        <Button variant="danger" disabled>Disabled</Button>
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <Button leftIcon={<PlusIcon />}>New trip</Button>
      <Button variant="secondary" rightIcon={<ArrowIcon />}>Continue</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger" leftIcon={<PlusIcon />}>Delete account</Button>
      <Button loading variant="primary">결제 중…</Button>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size={size}>{variant}</Button>
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
  decorators: [(Story) => <div style={{ colorScheme: "dark", padding: "var(--space-lg)" }}><Story /></div>],
};
