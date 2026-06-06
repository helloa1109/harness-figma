import { forwardRef } from "react";
import type {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

export type CardVariant = "outlined" | "elevated" | "flat";
export type CardPadding = "sm" | "md" | "lg";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  children: ReactNode;
}

const VARIANT_SURFACE: Record<CardVariant, string> = {
  outlined:
    "bg-[var(--color-surface-default)] border border-[var(--color-border-default)] border-[length:var(--border-width-thin)]",
  elevated: "bg-[var(--color-surface-default)]",
  flat: "bg-[var(--color-surface-subtle)]",
};

const PADDING_TOKEN: Record<CardPadding, string> = {
  sm: "p-[var(--space-md)]",
  md: "p-[var(--space-lg)]",
  lg: "p-[var(--space-xl)]",
};

const ELEVATED_SHADOW =
  "0 1px 3px var(--color-neutral-opacity-100), 0 1px 2px var(--color-neutral-opacity-200)";
const ELEVATED_SHADOW_HOVER =
  "0 4px 8px var(--color-neutral-opacity-200), 0 2px 4px var(--color-neutral-opacity-300)";

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "outlined",
    padding = "md",
    interactive = false,
    children,
    className,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    role,
    tabIndex,
    style,
    ...rest
  },
  ref,
) {
  const isClickable = interactive && typeof onClick === "function";

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick?.(event as unknown as MouseEvent<HTMLDivElement>);
    }
    onKeyDown?.(event);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    if (interactive && variant === "elevated") {
      event.currentTarget.style.boxShadow = ELEVATED_SHADOW_HOVER;
    }
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (interactive && variant === "elevated") {
      event.currentTarget.style.boxShadow = ELEVATED_SHADOW;
    }
    onMouseLeave?.(event);
  };

  const base =
    "rounded-[var(--radius-lg)] transition-all duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)]";
  const interactiveClasses = interactive
    ? "cursor-pointer hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]"
    : "";

  const classes = [
    base,
    VARIANT_SURFACE[variant],
    PADDING_TOKEN[padding],
    interactiveClasses,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const composedStyle =
    variant === "elevated"
      ? { boxShadow: ELEVATED_SHADOW, ...(style ?? {}) }
      : style;

  return (
    <div
      ref={ref}
      className={classes}
      style={composedStyle}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={isClickable ? role ?? "button" : role}
      tabIndex={isClickable ? tabIndex ?? 0 : tabIndex}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
