import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const SIZES = ["sm", "md"] as const;

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    checked: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    size: "md",
    label: "Label",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Indeterminate: Story = { args: { indeterminate: true } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const WithoutLabel: Story = { args: { label: undefined } };

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
    </div>
  ),
};

export const StateMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {SIZES.map((size) => (
        <div
          key={size}
          style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}
        >
          <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>size={size}</div>
          <div style={{ display: "flex", gap: "var(--space-lg)", alignItems: "center" }}>
            <Checkbox size={size} label="Unchecked" />
            <Checkbox size={size} label="Checked" defaultChecked />
            <Checkbox size={size} label="Indeterminate" indeterminate />
            <Checkbox size={size} label="Disabled" disabled />
            <Checkbox size={size} label="Disabled checked" disabled defaultChecked />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Checkbox
          label={`Controlled: ${checked ? "ON" : "OFF"}`}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    };
    return <ControlledExample />;
  },
};

export const ParentChildPattern: Story = {
  render: () => {
    const ParentChild = () => {
      const [items, setItems] = useState([false, false, false]);
      const allChecked = items.every(Boolean);
      const someChecked = items.some(Boolean);
      const indeterminate = someChecked && !allChecked;

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <Checkbox
            label="Select all"
            checked={allChecked}
            indeterminate={indeterminate}
            onChange={(e) => setItems(items.map(() => e.target.checked))}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-xs)",
              paddingLeft: "var(--space-lg)",
            }}
          >
            {items.map((checked, i) => (
              <Checkbox
                key={i}
                label={`Item ${i + 1}`}
                checked={checked}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.checked;
                  setItems(next);
                }}
              />
            ))}
          </div>
        </div>
      );
    };
    return <ParentChild />;
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <Checkbox label="이용약관에 동의합니다" />
      <Checkbox label="뉴스레터 수신 동의" defaultChecked />
      <Checkbox label="일부 선택됨" indeterminate />
      <Checkbox label="비활성 옵션" disabled />
      <Checkbox label="선택 불가 (선택됨)" disabled defaultChecked />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {SIZES.map((size) => (
        <div
          key={size}
          style={{ display: "flex", gap: "var(--space-lg)", alignItems: "center" }}
        >
          <Checkbox size={size} label="Unchecked" />
          <Checkbox size={size} label="Checked" defaultChecked />
          <Checkbox size={size} label="Indeterminate" indeterminate />
          <Checkbox size={size} label="Disabled" disabled />
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
