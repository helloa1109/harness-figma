import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";

const VARIANTS = ["primary", "secondary", "ghost"] as const;
const SIZES = ["sm", "md", "lg"] as const;

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

const meta: Meta<typeof IconButton> = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "primary",
    size: "md",
    "aria-label": "Close",
    icon: <CloseIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", icon: <MenuIcon />, "aria-label": "Menu" },
};

export const Ghost: Story = {
  args: { variant: "ghost", icon: <SettingsIcon />, "aria-label": "Settings" },
};

export const Disabled: Story = { args: { disabled: true } };

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      <IconButton size="sm" icon={<CloseIcon />} aria-label="Small close" />
      <IconButton size="md" icon={<CloseIcon />} aria-label="Medium close" />
      <IconButton size="lg" icon={<CloseIcon />} aria-label="Large close" />
    </div>
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          <span style={{ width: "2rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
            {size}
          </span>
          {VARIANTS.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              size={size}
              icon={<CloseIcon />}
              aria-label={`${variant} ${size} close`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const FullMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {[false, true].map((disabled) => (
        <div key={String(disabled)} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>
            disabled={String(disabled)}
          </div>
          {SIZES.map((size) => (
            <div key={size} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
              <span style={{ width: "2rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>
                {size}
              </span>
              {VARIANTS.map((variant) => (
                <IconButton
                  key={variant}
                  variant={variant}
                  size={size}
                  disabled={disabled}
                  icon={<CloseIcon />}
                  aria-label={`${variant} ${size} ${disabled ? "disabled" : ""} close`}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <IconButton variant="primary" size="md" icon={<CloseIcon />} aria-label="다이얼로그 닫기" />
        <span>다이얼로그 / 모달 닫기</span>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <IconButton variant="secondary" size="md" icon={<MenuIcon />} aria-label="메뉴 열기" />
        <span>네비게이션 메뉴</span>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <IconButton variant="ghost" size="md" icon={<HeartIcon />} aria-label="좋아요" />
        <span>좋아요 / 북마크 토글</span>
      </div>
      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <IconButton variant="ghost" size="lg" icon={<SettingsIcon />} aria-label="설정" />
        <span>설정 진입</span>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          {VARIANTS.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              size={size}
              icon={<CloseIcon />}
              aria-label={`dark ${variant} ${size}`}
            />
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
