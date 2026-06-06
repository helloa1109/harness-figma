import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular";
export type SkeletonSize = "sm" | "md" | "lg";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  animation?: SkeletonAnimation;
}

const RADIUS: Record<SkeletonVariant, string> = {
  text: "rounded-[var(--radius-xs)]",
  rectangular: "rounded-[var(--radius-sm)]",
  circular: "rounded-[var(--radius-full)]",
};

const TEXT_SIZE: Record<SkeletonSize, string> = {
  sm: "h-[12px] w-full",
  md: "h-[16px] w-full",
  lg: "h-[20px] w-full",
};

const CIRCULAR_SIZE: Record<SkeletonSize, string> = {
  sm: "size-[32px]",
  md: "size-[48px]",
  lg: "size-[64px]",
};

const RECTANGULAR_SIZE: Record<SkeletonSize, string> = {
  sm: "h-[40px] w-[60px]",
  md: "h-[60px] w-[100px]",
  lg: "h-[120px] w-[200px]",
};

function getSizeClass(variant: SkeletonVariant, size: SkeletonSize): string {
  switch (variant) {
    case "text":
      return TEXT_SIZE[size];
    case "circular":
      return CIRCULAR_SIZE[size];
    case "rectangular":
      return RECTANGULAR_SIZE[size];
  }
}

const WAVE_KEYFRAMES = `@keyframes skeleton-wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
@media (prefers-reduced-motion: reduce) {
  [data-skeleton-wave] { animation: none !important; }
  [data-skeleton-root] { animation: none !important; }
}`;

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  function Skeleton(
    {
      variant = "text",
      size = "md",
      animation = "pulse",
      className,
      ...rest
    },
    ref,
  ) {
    const base = [
      "relative inline-block overflow-hidden align-middle",
      "bg-[var(--color-surface-muted)]",
      RADIUS[variant],
      getSizeClass(variant, size),
      animation === "pulse" ? "animate-pulse" : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span
        ref={ref}
        role="status"
        aria-busy="true"
        data-skeleton-root=""
        className={base}
        {...rest}
      >
        {animation === "wave" && (
          <>
            <style>{WAVE_KEYFRAMES}</style>
            <span
              aria-hidden="true"
              data-skeleton-wave=""
              className="absolute inset-0 -translate-x-full"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                animation:
                  "skeleton-wave 1.6s var(--motion-easing-standard) infinite",
              }}
            />
          </>
        )}
        <span className="sr-only">Loading</span>
      </span>
    );
  },
);

Skeleton.displayName = "Skeleton";
