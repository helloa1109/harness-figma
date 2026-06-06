import { forwardRef, useId } from "react";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

export type SwitchSize = "sm" | "md";

export interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "asChild"> {
  size?: SwitchSize;
  label?: ReactNode;
}

const TRACK_SIZE: Record<SwitchSize, string> = {
  sm: "h-[18px] w-[32px]",
  md: "h-[24px] w-[44px]",
};

const THUMB_SIZE: Record<SwitchSize, string> = {
  sm: "size-[14px]",
  md: "size-[20px]",
};

// off: translate-x-[2px], on: track width - thumb size - 2px
const THUMB_TRANSFORM: Record<SwitchSize, string> = {
  sm: "translate-x-[2px] data-[state=checked]:translate-x-[16px]",
  md: "translate-x-[2px] data-[state=checked]:translate-x-[22px]",
};

const LABEL_FONT: Record<SwitchSize, string> = {
  sm: "text-[length:var(--font-size-sm)]",
  md: "text-[length:var(--font-size-base)]",
};

export const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(function Switch(
  { size = "md", label, disabled, id, className, ...rest },
  ref,
) {
  const autoId = useId();
  const switchId = id ?? `switch-${autoId}`;

  const rootClass = [
    "peer relative inline-flex shrink-0 cursor-pointer items-center",
    "rounded-[var(--radius-full)]",
    "border-[length:var(--border-width-thin)] border-solid border-transparent",
    "bg-[var(--color-border-strong)] data-[state=checked]:bg-[var(--color-brand-500)]",
    "transition-colors duration-[var(--motion-duration-base)]",
    "[transition-timing-function:var(--motion-easing-standard)]",
    "focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[length:var(--focus-ring-offset)]",
    "focus-visible:outline-[var(--focus-ring-color)]",
    "disabled:cursor-not-allowed",
    TRACK_SIZE[size],
  ].join(" ");

  const thumbClass = [
    "pointer-events-none block rounded-[var(--radius-full)]",
    "bg-[var(--color-action-text-on-brand)]",
    "shadow-[var(--shadow-thumb)]",
    "transition-transform duration-[var(--motion-duration-base)]",
    "[transition-timing-function:var(--motion-easing-standard)]",
    "will-change-transform",
    THUMB_SIZE[size],
    THUMB_TRANSFORM[size],
  ].join(" ");

  const wrapperClass = [
    "inline-flex items-center gap-[var(--space-sm)] font-sans",
    disabled ? "opacity-[var(--opacity-disabled)]" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const labelColor = disabled
    ? "text-[var(--color-text-tertiary)]"
    : "text-[var(--color-text-primary)]";

  const hasLabel = label !== undefined && label !== null && label !== "";

  return (
    <span className={wrapperClass}>
      <SwitchPrimitives.Root
        {...rest}
        id={switchId}
        ref={ref}
        disabled={disabled}
        className={rootClass}
      >
        <SwitchPrimitives.Thumb className={thumbClass} />
      </SwitchPrimitives.Root>
      {hasLabel && (
        <label
          htmlFor={switchId}
          className={[
            "font-medium leading-[var(--line-height-tight)] select-none",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
            LABEL_FONT[size],
            labelColor,
          ].join(" ")}
        >
          {label}
        </label>
      )}
    </span>
  );
});

Switch.displayName = "Switch";
