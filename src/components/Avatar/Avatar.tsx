import { forwardRef, useEffect, useState } from "react";
import type { HTMLAttributes } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarStatus = "none" | "online" | "offline" | "busy";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  initials?: string;
  status?: AvatarStatus;
}

const SIZE_PX: Record<AvatarSize, number> = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
  "2xl": 72,
};

const FONT_PX: Record<AvatarSize, number> = {
  xs: 9,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 18,
  "2xl": 24,
};

const ICON_PX: Record<AvatarSize, number> = {
  xs: 12,
  sm: 14,
  md: 20,
  lg: 24,
  xl: 34,
  "2xl": 44,
};

const STATUS_PX: Record<AvatarSize, number> = {
  xs: 5,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
  "2xl": 18,
};

const STATUS_BG: Record<Exclude<AvatarStatus, "none">, string> = {
  online: "bg-[var(--color-success-500)]",
  offline: "bg-[var(--color-neutral-400)]",
  busy: "bg-[var(--color-danger-500)]",
};

function PersonIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path
        d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
        fill="currentColor"
      />
    </svg>
  );
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  {
    size = "md",
    src,
    alt,
    initials,
    status = "none",
    className,
    ...rest
  },
  ref,
) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  const variant: "image" | "initials" | "icon" =
    src && !imgError ? "image" : initials ? "initials" : "icon";

  const px = SIZE_PX[size];
  const statusPx = STATUS_PX[size];
  const iconPx = ICON_PX[size];
  const fontPx = FONT_PX[size];

  const ariaLabel = alt ?? initials ?? "avatar";
  const imageAlt = alt ?? initials ?? "avatar";

  const base =
    "relative inline-flex items-center justify-center overflow-visible rounded-[var(--radius-full)] font-sans font-bold leading-[var(--line-height-tight)]";

  const variantClass =
    variant === "image"
      ? "bg-[var(--color-neutral-300)]"
      : variant === "initials"
        ? "bg-[var(--color-brand-100)] text-[var(--color-brand-700)]"
        : "bg-[var(--color-surface-muted)] text-[var(--color-neutral-500)]";

  const classes = [base, variantClass, className ?? ""]
    .filter(Boolean)
    .join(" ");

  const isImage = variant === "image";

  return (
    <span
      ref={ref}
      {...(isImage ? {} : { role: "img", "aria-label": ariaLabel })}
      className={classes}
      style={{ width: px, height: px, fontSize: fontPx }}
      {...rest}
    >
      {isImage && src ? (
        <img
          src={src}
          alt={imageAlt}
          onError={() => setImgError(true)}
          className="h-full w-full rounded-[var(--radius-full)] object-cover"
          style={{ width: px, height: px }}
        />
      ) : variant === "initials" ? (
        <span aria-hidden="true">{initials}</span>
      ) : (
        <PersonIcon size={iconPx} />
      )}

      {status !== "none" ? (
        <span
          aria-hidden="true"
          className={[
            "absolute bottom-0 right-0 block rounded-[var(--radius-full)] ring-[var(--border-width-base)] ring-[var(--color-neutral-0)]",
            STATUS_BG[status],
          ].join(" ")}
          style={{ width: statusPx, height: statusPx }}
        />
      ) : null}
    </span>
  );
});

Avatar.displayName = "Avatar";
