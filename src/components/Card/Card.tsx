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
  /** clickable 처리 (cursor + hover lift + keyboard 활성화). onClick 함께 전달 권장. */
  interactive?: boolean;
  children: ReactNode;
}

const VARIANT_SURFACE: Record<CardVariant, string> = {
  outlined:
    "bg-[var(--color-surface-default)] border border-[var(--color-border-default)] border-[length:var(--border-width-thin)]",
  elevated:
    "bg-[var(--color-surface-default)] shadow-[var(--shadow-card-rest)] hover:shadow-[var(--shadow-card-hover)]",
  flat: "bg-[var(--color-surface-subtle)]",
};

const PADDING_TOKEN: Record<CardPadding, string> = {
  sm: "p-[var(--space-md)]",
  md: "p-[var(--space-lg)]",
  lg: "p-[var(--space-xl)]",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "outlined",
    padding = "md",
    interactive = false,
    children,
    className,
    onClick,
    onKeyDown,
    role,
    tabIndex,
    ...rest
  },
  ref,
) {
  const isClickable = interactive && typeof onClick === "function";

  if (
    process.env.NODE_ENV !== "production" &&
    interactive &&
    !isClickable &&
    !role
  ) {
    console.warn(
      "[Card] interactive=true 인데 onClick 없음 — 키보드/role 활성화 안 됨. onClick 전달 또는 interactive=false 권장.",
    );
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick?.(event as unknown as MouseEvent<HTMLDivElement>);
    }
    onKeyDown?.(event);
  };

  const base =
    "rounded-[var(--radius-lg)] transition-all duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)]";
  const interactiveClasses = interactive
    ? "cursor-pointer hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-[length:var(--focus-ring-width)] focus-visible:outline-offset-[length:var(--focus-ring-offset)] focus-visible:outline-[var(--focus-ring-color)]"
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

  return (
    <div
      ref={ref}
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? role ?? "button" : role}
      tabIndex={isClickable ? tabIndex ?? 0 : tabIndex}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
