import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "./Switch";

const SIZES = ["sm", "md"] as const;

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    size: "md",
    label: "Label",
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const On: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledOn: Story = { args: { disabled: true, defaultChecked: true } };

export const WithoutLabel: Story = {
  args: { label: undefined, "aria-label": "알림 수신" },
  parameters: {
    docs: {
      description: {
        story:
          "라벨을 화면에 표시하지 않을 때는 `aria-label`을 반드시 전달해 스크린리더 사용자에게 의미를 전달해야 합니다.",
      },
    },
  },
};

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
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
            <Switch size={size} label="Off" />
            <Switch size={size} label="On" defaultChecked />
            <Switch size={size} label="Disabled" disabled />
            <Switch size={size} label="Disabled on" disabled defaultChecked />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [on, setOn] = useState(false);
      return (
        <Switch
          label={`Controlled: ${on ? "ON" : "OFF"}`}
          checked={on}
          onCheckedChange={setOn}
        />
      );
    };
    return <ControlledExample />;
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        minWidth: "20rem",
      }}
    >
      <Row label="알림 수신" defaultChecked />
      <Row label="자동 업데이트" />
      <Row label="다크모드" defaultChecked />
      <Row label="베타 기능" disabled />
      <Row label="잠긴 옵션" disabled defaultChecked />
    </div>
  ),
};

function Row({
  label,
  defaultChecked,
  disabled,
}: {
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "var(--space-sm) 0",
      }}
    >
      <span style={{ color: "var(--color-text-primary)" }}>{label}</span>
      <Switch
        size="md"
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-label={label}
      />
    </div>
  );
}

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", gap: "var(--space-lg)", alignItems: "center" }}>
          <Switch size={size} label="Off" />
          <Switch size={size} label="On" defaultChecked />
          <Switch size={size} label="Disabled" disabled />
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
