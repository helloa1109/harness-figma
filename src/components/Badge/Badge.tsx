import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";
export type BadgeSize = "sm" | "md";
export type BadgeStyle = "solid" | "soft";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: BadgeStyle;
  children: ReactNode;
}

const BG_TOKEN: Record<BadgeStyle, Record<BadgeVariant, string>> = {
  solid: {
    default: "bg-[var(--color-neutral-800)]",
    primary: "bg-[var(--color-brand-500)]",
    success: "bg-[var(--color-success-500)]",
    warning: "bg-[var(--color-warning-500)]",
    danger:  "bg-[var(--color-danger-500)]",
    neutral: "bg-[var(--color-neutral-500)]",
  },
  soft: {
    default: "bg-[var(--color-neutral-100)]",
    primary: "bg-[var(--color-brand-50)]",
    success: "bg-[var(--color-success-50)]",
    warning: "bg-[var(--color-warning-50)]",
    danger:  "bg-[var(--color-danger-50)]",
    neutral: "bg-[var(--color-neutral-100)]",
  },
};

const TEXT_TOKEN: Record<BadgeStyle, Record<BadgeVariant, string>> = {
  solid: {
    default: "text-[var(--color-neutral-0)]",
    primary: "text-[var(--color-neutral-0)]",
    success: "text-[var(--color-neutral-0)]",
    warning: "text-[var(--color-neutral-900)]",
    danger:  "text-[var(--color-neutral-0)]",
    neutral: "text-[var(--color-neutral-0)]",
  },
  soft: {
    default: "text-[var(--color-neutral-800)]",
    primary: "text-[var(--color-brand-700)]",
    success: "text-[var(--color-success-700)]",
    warning: "text-[var(--color-warning-700)]",
    danger:  "text-[var(--color-danger-700)]",
    neutral: "text-[var(--color-neutral-700)]",
  },
};

const SIZE_PADDING: Record<BadgeSize, string> = {
  sm: "p-[var(--space-xs)]",
  md: "px-[var(--space-sm)] py-[var(--space-xs)]",
};

const SIZE_FONT: Record<BadgeSize, string> = {
  sm: "text-[length:var(--font-size-xs)]",
  md: "text-[length:var(--font-size-sm)]",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "default",
    size = "sm",
    style = "solid",
    children,
    className,
    ...rest
  },
  ref,
) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-sans font-[number:var(--font-weight-semibold)] leading-[var(--line-height-tight)]";
  const classes = [
    base,
    SIZE_PADDING[size],
    SIZE_FONT[size],
    BG_TOKEN[style][variant],
    TEXT_TOKEN[style][variant],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span ref={ref} className={classes} {...rest}>
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
