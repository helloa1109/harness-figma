import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonVariant = "primary" | "secondary" | "ghost";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** SVG 권장: `width="100%" height="100%"` + `stroke="currentColor"`/`fill="currentColor"` */
  icon: ReactNode;
  /** 아이콘만 있으므로 스크린리더용 라벨 필수 */
  "aria-label": string;
}

const BOX_SIZE: Record<IconButtonSize, string> = {
  sm: "size-[32px]",
  md: "size-[40px]",
  lg: "size-[48px]",
};

const ICON_SIZE: Record<IconButtonSize, string> = {
  sm: "size-[16px]",
  md: "size-[20px]",
  lg: "size-[24px]",
};

const VARIANT_CLASS: Record<IconButtonVariant, string> = {
  primary: [
    "bg-[var(--color-action-bg-default)]",
    "text-[var(--color-action-text-on-brand)]",
    "hover:bg-[var(--color-action-bg-hover)]",
    "active:bg-[var(--color-action-bg-pressed)]",
  ].join(" "),
  secondary: [
    "bg-[var(--color-surface-subtle)]",
    "text-[var(--color-text-primary)]",
    "hover:bg-[var(--color-neutral-200)]",
    "active:bg-[var(--color-neutral-300)]",
  ].join(" "),
  ghost: [
    "bg-transparent",
    "text-[var(--color-text-secondary)]",
    "hover:bg-[var(--color-neutral-200)]",
    "active:bg-[var(--color-neutral-300)]",
  ].join(" "),
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      variant = "primary",
      size = "md",
      icon,
      type = "button",
      disabled,
      className,
      ...rest
    },
    ref,
  ) {
    const buttonClass = [
      "inline-flex items-center justify-center shrink-0",
      "rounded-[var(--radius-sm)]",
      "transition-colors duration-[var(--motion-duration-fast)]",
      "[transition-timing-function:var(--motion-easing-standard)]",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
      "focus-visible:outline-[var(--color-brand-500)]",
      "disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]",
      "disabled:hover:bg-[unset] disabled:active:bg-[unset]",
      BOX_SIZE[size],
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
        disabled={disabled}
        className={buttonClass}
      >
        <span
          aria-hidden="true"
          className={`inline-flex items-center justify-center ${ICON_SIZE[size]}`}
        >
          {icon}
        </span>
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
