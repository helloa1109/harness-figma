import { createContext, forwardRef, useContext } from "react";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export type TabsSize = "sm" | "md" | "lg";
export type TabsVariant = "underline" | "filled";

type TabsContextValue = {
  size: TabsSize;
  variant: TabsVariant;
};

const TabsContext = createContext<TabsContextValue>({
  size: "md",
  variant: "underline",
});

const useTabsContext = () => useContext(TabsContext);

export interface TabsProps
  extends Omit<ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "asChild"> {
  size?: TabsSize;
  variant?: TabsVariant;
}

export const Tabs = forwardRef<
  ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(function Tabs(
  { size = "md", variant = "underline", className, children, ...rest },
  ref,
) {
  return (
    <TabsContext.Provider value={{ size, variant }}>
      <TabsPrimitive.Root
        {...rest}
        ref={ref}
        className={["font-sans", className ?? ""].filter(Boolean).join(" ")}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  );
});

Tabs.displayName = "Tabs";

export type TabsListProps = Omit<
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  "asChild"
>;

const LIST_BASE = "inline-flex items-center";

const LIST_STYLE: Record<TabsVariant, string> = {
  underline: [
    "w-full",
    "border-b-[length:var(--border-width-thin)] border-solid",
    "border-[var(--color-border-default)]",
  ].join(" "),
  filled: [
    "gap-[var(--space-xs)]",
    "rounded-[var(--radius-md)]",
    "bg-[var(--color-surface-muted)]",
    "p-[var(--space-xs)]",
  ].join(" "),
};

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(function TabsList({ className, ...rest }, ref) {
  const { variant } = useTabsContext();
  return (
    <TabsPrimitive.List
      {...rest}
      ref={ref}
      className={[LIST_BASE, LIST_STYLE[variant], className ?? ""]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

TabsList.displayName = "TabsList";

export type TabsTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  "asChild"
>;

// 시안은 30/39/49(underline), 32/41/51(filled). 8pt grid + IconButton 컨트롤 높이와 정렬을 위해 32/40/48로 통일.
const TRIGGER_HEIGHT: Record<TabsSize, string> = {
  sm: "h-[32px]",
  md: "h-[40px]",
  lg: "h-[48px]",
};

const TRIGGER_FONT: Record<TabsSize, string> = {
  sm: "text-[length:var(--font-size-sm)]",
  md: "text-[length:var(--font-size-base)]",
  lg: "text-[length:var(--font-size-lg)]",
};

const TRIGGER_BASE = [
  "inline-flex items-center justify-center select-none",
  "px-[var(--space-md)]",
  "font-medium leading-[var(--line-height-tight)]",
  "text-[var(--color-text-secondary)]",
  "data-[state=active]:text-[var(--color-text-primary)]",
  "transition-colors duration-[var(--motion-duration-base)]",
  "[transition-timing-function:var(--motion-easing-standard)]",
  "cursor-pointer disabled:cursor-not-allowed",
  "disabled:opacity-[var(--opacity-disabled)]",
  "focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
  "focus-visible:outline-[var(--focus-ring-color)]",
].join(" ");

const TRIGGER_STYLE: Record<TabsVariant, string> = {
  underline: [
    "relative",
    "border-b-[length:var(--border-width-base)] border-solid border-transparent",
    "-mb-[length:var(--border-width-thin)]",
    "data-[state=active]:border-[var(--color-brand-500)]",
  ].join(" "),
  filled: [
    "rounded-[var(--radius-md)]",
    "data-[state=active]:bg-[var(--color-surface-subtle)]",
  ].join(" "),
};

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, ...rest }, ref) {
  const { size, variant } = useTabsContext();
  return (
    <TabsPrimitive.Trigger
      {...rest}
      ref={ref}
      className={[
        TRIGGER_BASE,
        TRIGGER_HEIGHT[size],
        TRIGGER_FONT[size],
        TRIGGER_STYLE[variant],
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

TabsTrigger.displayName = "TabsTrigger";

export type TabsContentProps = Omit<
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
  "asChild"
> & {
  children?: ReactNode;
};

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(function TabsContent({ className, ...rest }, ref) {
  // a11y: Radix가 빈 panel에 tabindex=0 자동 부여 → 키보드 포커스 어포던스로 outline 유지
  return (
    <TabsPrimitive.Content
      {...rest}
      ref={ref}
      className={[
        "focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
        "focus-visible:outline-[var(--focus-ring-color)]",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

TabsContent.displayName = "TabsContent";
