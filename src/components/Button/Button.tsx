import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const HEIGHT: Record<ButtonSize, string> = {
  sm: "h-[32px]",
  md: "h-[40px]",
  lg: "h-[48px]",
};

const PADDING: Record<ButtonSize, string> = {
  sm: "px-[var(--space-md)] py-[var(--space-xs)]",
  md: "px-[var(--space-lg)] py-[var(--space-sm)]",
  lg: "px-[var(--space-xl)] py-[var(--space-md)]",
};

const FONT_SIZE: Record<ButtonSize, string> = {
  sm: "text-[length:var(--font-size-sm)]",
  md: "text-[length:var(--font-size-base)]",
  lg: "text-[length:var(--font-size-lg)]",
};

const GAP: Record<ButtonSize, string> = {
  sm: "gap-[var(--space-xs)]",
  md: "gap-[var(--space-sm)]",
  lg: "gap-[var(--space-sm)]",
};

const ICON_SIZE: Record<ButtonSize, string> = {
  sm: "size-[16px]",
  md: "size-[18px]",
  lg: "size-[20px]",
};

const SPINNER_SIZE: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-action-bg-default)]",
    "text-[var(--color-action-text-on-brand)]",
    "hover:bg-[var(--color-action-bg-hover)]",
    "active:bg-[var(--color-action-bg-pressed)]",
  ].join(" "),
  secondary: [
    "bg-[var(--color-surface-subtle)]",
    "text-[var(--color-text-primary)]",
    "border-[length:var(--border-width-thin)] border-solid",
    "border-[var(--color-border-default)]",
    "hover:bg-[var(--color-surface-muted)]",
    "active:bg-[var(--color-neutral-opacity-200)]",
  ].join(" "),
  ghost: [
    "bg-transparent",
    "text-[var(--color-text-primary)]",
    "hover:bg-[var(--color-surface-muted)]",
    "active:bg-[var(--color-neutral-opacity-200)]",
  ].join(" "),
  danger: [
    "bg-[var(--color-danger-500)]",
    "text-[var(--color-action-text-on-brand)]",
    "hover:bg-[var(--color-danger-600)]",
    "active:bg-[var(--color-danger-700)]",
  ].join(" "),
};

function Spinner({ size }: { size: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin shrink-0"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      type = "button",
      disabled,
      className,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    const buttonClass = [
      "inline-flex items-center justify-center shrink-0",
      "font-[family-name:var(--font-sans)]",
      "font-[number:var(--font-weight-medium)]",
      "rounded-[var(--radius-md)]",
      "transition-colors duration-[var(--motion-duration-fast)]",
      "[transition-timing-function:var(--motion-easing-standard)]",
      "focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
      "focus-visible:outline-[var(--focus-ring-color)]",
      "disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]",
      "disabled:hover:bg-[unset] disabled:active:bg-[unset]",
      fullWidth ? "w-full" : "",
      HEIGHT[size],
      PADDING[size],
      FONT_SIZE[size],
      GAP[size],
      VARIANT_CLASS[variant],
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        className={`relative ${buttonClass}`}
      >
        {loading && (
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <Spinner size={SPINNER_SIZE[size]} />
          </span>
        )}
        <span
          className={`inline-flex items-center justify-center gap-inherit ${loading ? "opacity-0" : ""}`}
          style={{ gap: "inherit" }}
        >
          {leftIcon && (
            <span
              aria-hidden="true"
              className={`inline-flex items-center justify-center shrink-0 ${ICON_SIZE[size]}`}
            >
              {leftIcon}
            </span>
          )}
          <span>{children}</span>
          {rightIcon && (
            <span
              aria-hidden="true"
              className={`inline-flex items-center justify-center shrink-0 ${ICON_SIZE[size]}`}
            >
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";
