import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tab";

const SIZES = ["sm", "md", "lg"] as const;
const STYLES = ["underline", "filled"] as const;

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: SIZES },
    variant: { control: "inline-radio", options: STYLES },
  },
  args: { size: "md", variant: "underline" },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

function SampleContent({ title }: { title: string }) {
  return (
    <div style={{ padding: "var(--space-md)", color: "var(--color-text-primary)" }}>
      <h3 style={{ margin: 0, fontSize: "var(--font-size-base)", fontWeight: 600 }}>{title}</h3>
      <p style={{ margin: "var(--space-xs) 0 0", color: "var(--color-text-secondary)" }}>
        {title} 영역의 내용입니다.
      </p>
    </div>
  );
}

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="overview" variant={args.variant ?? "underline"}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><SampleContent title="Overview" /></TabsContent>
      <TabsContent value="details"><SampleContent title="Details" /></TabsContent>
      <TabsContent value="settings"><SampleContent title="Settings" /></TabsContent>
    </Tabs>
  ),
};

export const Filled: Story = {
  args: { variant: "filled" },
  render: (args) => (
    <Tabs {...args} defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="done">Done</TabsTrigger>
      </TabsList>
      <TabsContent value="all"><SampleContent title="All" /></TabsContent>
      <TabsContent value="active"><SampleContent title="Active" /></TabsContent>
      <TabsContent value="done"><SampleContent title="Done" /></TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="locked" disabled>Locked</TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><SampleContent title="Overview" /></TabsContent>
      <TabsContent value="details"><SampleContent title="Details" /></TabsContent>
      <TabsContent value="locked"><SampleContent title="Locked" /></TabsContent>
    </Tabs>
  ),
};

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>size={size}</div>
          <Tabs defaultValue="overview" size={size}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"><SampleContent title={`Overview (${size})`} /></TabsContent>
            <TabsContent value="details"><SampleContent title={`Details (${size})`} /></TabsContent>
            <TabsContent value="settings"><SampleContent title={`Settings (${size})`} /></TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
      {STYLES.map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>variant={variant}</div>
          <Tabs defaultValue="overview" variant={variant}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"><SampleContent title={`Overview (${variant})`} /></TabsContent>
            <TabsContent value="details"><SampleContent title={`Details (${variant})`} /></TabsContent>
            <TabsContent value="settings"><SampleContent title={`Settings (${variant})`} /></TabsContent>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState("overview");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
            Selected: <strong>{value}</strong>
          </div>
          <Tabs value={value} onValueChange={setValue}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview"><SampleContent title="Overview" /></TabsContent>
            <TabsContent value="details"><SampleContent title="Details" /></TabsContent>
            <TabsContent value="settings"><SampleContent title="Settings" /></TabsContent>
          </Tabs>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)", width: "32rem" }}>
      <Tabs defaultValue="itinerary" variant="underline">
        <TabsList>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="itinerary"><SampleContent title="Itinerary" /></TabsContent>
        <TabsContent value="budget"><SampleContent title="Budget" /></TabsContent>
        <TabsContent value="map"><SampleContent title="Map" /></TabsContent>
      </Tabs>
      <Tabs defaultValue="all" variant="filled" size="sm">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <TabsContent value="all"><SampleContent title="All" /></TabsContent>
        <TabsContent value="active"><SampleContent title="Active" /></TabsContent>
        <TabsContent value="done"><SampleContent title="Done" /></TabsContent>
      </Tabs>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
      {STYLES.map((variant) => (
        <Tabs key={variant} defaultValue="overview" variant={variant}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><SampleContent title={`Overview (${variant})`} /></TabsContent>
          <TabsContent value="details"><SampleContent title={`Details (${variant})`} /></TabsContent>
          <TabsContent value="settings"><SampleContent title={`Settings (${variant})`} /></TabsContent>
        </Tabs>
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
