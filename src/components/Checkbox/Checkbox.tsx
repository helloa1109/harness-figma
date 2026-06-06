import { forwardRef, useEffect, useId, useRef } from "react";
import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export type CheckboxSize = "sm" | "md";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: CheckboxSize;
  indeterminate?: boolean;
  label?: ReactNode;
}

const BOX_SIZE: Record<CheckboxSize, string> = {
  sm: "size-[16px]",
  md: "size-[20px]",
};

const MARK_SIZE: Record<CheckboxSize, string> = {
  sm: "size-[10px]",
  md: "size-[12px]",
};

const LABEL_FONT: Record<CheckboxSize, string> = {
  sm: "text-[length:var(--font-size-sm)]",
  md: "text-[length:var(--font-size-base)]",
};

function setRefs<T>(node: T, ...refs: Array<Ref<T> | undefined>) {
  for (const ref of refs) {
    if (!ref) continue;
    if (typeof ref === "function") ref(node);
    else (ref as { current: T | null }).current = node;
  }
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      size = "md",
      indeterminate = false,
      disabled = false,
      checked,
      defaultChecked,
      label,
      id,
      className,
      ...rest
    },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const autoId = useId();
    const inputId = id ?? `checkbox-${autoId}`;

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const isFilled =
      indeterminate || checked === true || (checked === undefined && defaultChecked === true);

    const rootClass = [
      "inline-flex items-center gap-[var(--space-sm)] font-sans",
      disabled
        ? "opacity-[var(--opacity-disabled)] cursor-not-allowed"
        : "cursor-pointer",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const boxBorder = isFilled
      ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)]"
      : disabled
        ? "border-[var(--color-border-default)] bg-transparent"
        : "border-[var(--color-border-strong)] bg-transparent";

    const boxClass = [
      "relative inline-flex items-center justify-center shrink-0",
      "rounded-[var(--radius-sm)]",
      "border-[length:var(--border-width-thin)] border-solid",
      "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
      "peer-focus-visible:outline-[var(--color-brand-500)]",
      BOX_SIZE[size],
      boxBorder,
    ].join(" ");

    const labelColor = disabled
      ? "text-[var(--color-text-tertiary)]"
      : "text-[var(--color-text-primary)]";

    return (
      <label htmlFor={inputId} className={rootClass}>
        <input
          {...rest}
          id={inputId}
          ref={(node) => setRefs(node, innerRef, ref)}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : undefined}
          className="sr-only peer"
        />
        <span
          aria-hidden="true"
          className={boxClass}
        >
          {indeterminate ? (
            <IndeterminateIcon className={MARK_SIZE[size]} />
          ) : isFilled ? (
            <CheckIcon className={MARK_SIZE[size]} />
          ) : null}
        </span>
        {label !== undefined && label !== null && label !== "" && (
          <span
            className={[
              "font-medium leading-[var(--line-height-tight)]",
              LABEL_FONT[size],
              labelColor,
            ].join(" ")}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 6.2L4.8 9L10 3.5"
        stroke="var(--color-action-text-on-brand)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IndeterminateIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="5"
        width="9"
        height="2"
        rx="1"
        fill="var(--color-action-text-on-brand)"
      />
    </svg>
  );
}
