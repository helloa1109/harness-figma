import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "UI/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: {
    label: "이메일",
    placeholder: "you@example.com",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: { helper: "로그인 시 사용한 이메일을 입력하세요" },
};

export const Required: Story = {
  args: { required: true, helper: "필수 입력 항목입니다" },
};

export const Filled: Story = {
  args: { defaultValue: "hello@toss.im" },
};

export const ErrorState: Story = {
  args: {
    defaultValue: "잘못된-이메일",
    error: "올바른 이메일 형식이 아닙니다",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "변경 불가" },
};

export const SmallSize: Story = {
  args: { size: "sm" },
};

export const LargeSize: Story = {
  args: { size: "lg" },
};

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", width: "20rem" }}>
      <TextField size="sm" label="Small" placeholder="size=sm" />
      <TextField size="md" label="Medium" placeholder="size=md" />
      <TextField size="lg" label="Large" placeholder="size=lg" />
    </div>
  ),
};

export const StateMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", width: "20rem" }}>
      <TextField label="Default" placeholder="입력해주세요" />
      <TextField label="Required" required placeholder="필수 항목" />
      <TextField label="With helper" placeholder="입력" helper="도움말 텍스트" />
      <TextField label="Filled" defaultValue="채워진 값" />
      <TextField label="Error" defaultValue="잘못됨" error="에러 메시지" />
      <TextField label="Disabled" disabled defaultValue="비활성" />
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", width: "20rem" }}>
      <TextField label="Default" placeholder="입력해주세요" />
      <TextField label="Filled" defaultValue="채워진 값" />
      <TextField label="Error" defaultValue="잘못됨" error="에러 메시지" />
      <TextField label="Disabled" disabled defaultValue="비활성" />
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
