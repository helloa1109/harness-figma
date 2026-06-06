import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
const STATUSES = ["none", "online", "offline", "busy"] as const;

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    status: { control: "inline-radio", options: STATUSES },
    src: { control: "text" },
    initials: { control: "text" },
    alt: { control: "text" },
  },
  args: {
    size: "md",
    initials: "JD",
    status: "none",
    alt: "Jane Doe",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/100?img=12", initials: undefined, alt: "User" },
};
export const Fallback: Story = { args: { initials: undefined, alt: undefined } };

export const Online: Story = { args: { status: "online" } };
export const Offline: Story = { args: { status: "offline" } };
export const Busy: Story = { args: { status: "busy" } };

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      {SIZES.map((size) => (
        <Avatar key={size} size={size} initials="JD" alt={`${size} avatar`} />
      ))}
    </div>
  ),
};

export const StatusMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
      {STATUSES.map((status) => (
        <Avatar key={status} size="lg" initials="JD" status={status} alt={`Status ${status}`} />
      ))}
    </div>
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <span style={{ width: "5rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>image</span>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} src="https://i.pravatar.cc/100?img=12" alt="User" />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <span style={{ width: "5rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>initials</span>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} initials="JD" alt={`${size} JD`} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <span style={{ width: "5rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>icon</span>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} alt={`${size} anonymous`} />
        ))}
      </div>
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      {[12, 13, 14, 15].map((i, idx) => (
        <div key={i} style={{ marginLeft: idx === 0 ? 0 : "-10px" }}>
          <Avatar
            size="md"
            src={`https://i.pravatar.cc/100?img=${i}`}
            alt={`User ${i}`}
          />
        </div>
      ))}
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <Avatar size="lg" src="https://i.pravatar.cc/100?img=12" alt="Jane Doe" status="online" />
        <div>
          <div style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>Jane Doe</div>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>Online · Last trip 3d ago</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <Avatar size="md" initials="KH" alt="Kim Hong" status="busy" />
        <div style={{ color: "var(--color-text-primary)" }}>Kim Hong</div>
      </div>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <Avatar size="md" alt="Anonymous" />
        <div style={{ color: "var(--color-text-secondary)" }}>Anonymous</div>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <span style={{ width: "5rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>image</span>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} src="https://i.pravatar.cc/100?img=12" alt="User" />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <span style={{ width: "5rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>initials</span>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} initials="JD" alt={`${size} JD`} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <span style={{ width: "5rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>icon</span>
        {SIZES.map((size) => (
          <Avatar key={size} size={size} alt={`${size} anonymous`} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
        <span style={{ width: "5rem", fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)" }}>status</span>
        {STATUSES.map((status) => (
          <Avatar key={status} size="lg" initials="JD" status={status} alt={`Status ${status}`} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: "dark", values: [{ name: "dark", value: "var(--color-neutral-900)" }] },
  },
  decorators: [(Story) => <div style={{ colorScheme: "dark", padding: "var(--space-lg)" }}><Story /></div>],
};
