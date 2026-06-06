import { createContext, forwardRef, useContext } from "react";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

export type ToastVariant = "info" | "success" | "warning" | "danger";

type ToastContextValue = { variant: ToastVariant };

const ToastContext = createContext<ToastContextValue>({ variant: "info" });

const useToastContext = () => useContext(ToastContext);

export const ToastProvider = ToastPrimitives.Provider;

export type ToastViewportProps = Omit<
  ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>,
  "asChild"
>;

const VIEWPORT_BASE = [
  "fixed bottom-[var(--space-md)] right-[var(--space-md)]",
  "z-[2147483647]",
  "flex flex-col gap-[var(--space-sm)]",
  "w-[360px] max-w-[100vw]",
  "m-0 p-0 list-none outline-none",
].join(" ");

export const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitives.Viewport>,
  ToastViewportProps
>(function ToastViewport({ className, ...rest }, ref) {
  return (
    <ToastPrimitives.Viewport
      {...rest}
      ref={ref}
      className={[VIEWPORT_BASE, className ?? ""].filter(Boolean).join(" ")}
    />
  );
});

ToastViewport.displayName = "ToastViewport";

const VARIANT_SURFACE: Record<ToastVariant, string> = {
  info: [
    "bg-[var(--color-surface-default)]",
    "border-[var(--color-border-default)]",
  ].join(" "),
  success: [
    "bg-[var(--color-success-50)]",
    "border-[var(--color-success-500)]",
  ].join(" "),
  warning: [
    "bg-[var(--color-warning-50)]",
    "border-[var(--color-warning-500)]",
  ].join(" "),
  danger: [
    "bg-[var(--color-danger-50)]",
    "border-[var(--color-danger-500)]",
  ].join(" "),
};

const VARIANT_ICON_COLOR: Record<ToastVariant, string> = {
  info: "text-[var(--color-brand-500)]",
  success: "text-[var(--color-success-500)]",
  warning: "text-[var(--color-warning-500)]",
  danger: "text-[var(--color-danger-500)]",
};

function InfoIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="m8.5 12.5 2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 21.5 20H2.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function DangerIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3h8l5 5v8l-5 5H8l-5-5V8l5-5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const VARIANT_ICON: Record<ToastVariant, ReactNode> = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  danger: <DangerIcon />,
};

export interface ToastProps
  extends Omit<ComponentPropsWithoutRef<typeof ToastPrimitives.Root>, "asChild"> {
  variant?: ToastVariant;
}

const ROOT_BASE = [
  "relative grid grid-cols-[auto_1fr_auto] items-start",
  "gap-[var(--space-sm)]",
  "w-full max-w-[360px]",
  "p-[var(--space-md)]",
  "rounded-[var(--radius-md)]",
  "border-[length:var(--border-width-thin)] border-solid",
  "font-[family-name:var(--font-sans)]",
  // animation
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-4",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full",
  "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
  "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
  "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
  "data-[swipe=end]:animate-out data-[swipe=end]:fade-out-0 data-[swipe=end]:slide-out-to-right-full",
  "[transition-timing-function:var(--motion-easing-standard)]",
].join(" ");

export const Toast = forwardRef<
  ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(function Toast({ variant = "info", className, children, style, type, ...rest }, ref) {
  // a11y: danger/warning은 즉시 안내(assertive)되도록 foreground 기본값. 사용자가 type 명시 시 override
  const resolvedType =
    type ?? (variant === "danger" || variant === "warning" ? "foreground" : "background");
  return (
    <ToastContext.Provider value={{ variant }}>
      <ToastPrimitives.Root
        {...rest}
        ref={ref}
        type={resolvedType}
        className={[ROOT_BASE, VARIANT_SURFACE[variant], className ?? ""]
          .filter(Boolean)
          .join(" ")}
        style={{
          boxShadow: "0 4px 12px var(--color-neutral-opacity-100)",
          ...style,
        }}
      >
        <span
          aria-hidden="true"
          className={[
            "inline-flex items-center justify-center shrink-0",
            "size-[24px] row-span-2",
            VARIANT_ICON_COLOR[variant],
          ].join(" ")}
        >
          {VARIANT_ICON[variant]}
        </span>
        {children}
      </ToastPrimitives.Root>
    </ToastContext.Provider>
  );
});

Toast.displayName = "Toast";

export type ToastTitleProps = Omit<
  ComponentPropsWithoutRef<typeof ToastPrimitives.Title>,
  "asChild"
>;

export const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitives.Title>,
  ToastTitleProps
>(function ToastTitle({ className, ...rest }, ref) {
  return (
    <ToastPrimitives.Title
      {...rest}
      ref={ref}
      className={[
        "col-start-2 row-start-1",
        "text-[length:var(--font-size-sm)]",
        "font-[number:var(--font-weight-bold)]",
        "leading-[var(--line-height-tight)]",
        "text-[var(--color-text-primary)]",
        "m-0",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

ToastTitle.displayName = "ToastTitle";

export type ToastDescriptionProps = Omit<
  ComponentPropsWithoutRef<typeof ToastPrimitives.Description>,
  "asChild"
>;

export const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitives.Description>,
  ToastDescriptionProps
>(function ToastDescription({ className, ...rest }, ref) {
  return (
    <ToastPrimitives.Description
      {...rest}
      ref={ref}
      className={[
        "col-start-2",
        "text-[length:var(--font-size-sm)]",
        "leading-[var(--line-height-base)]",
        "text-[var(--color-text-secondary)]",
        "m-0",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

ToastDescription.displayName = "ToastDescription";

export type ToastActionProps = ComponentPropsWithoutRef<
  typeof ToastPrimitives.Action
>;

export const ToastAction = forwardRef<
  ElementRef<typeof ToastPrimitives.Action>,
  ToastActionProps
>(function ToastAction({ className, ...rest }, ref) {
  return (
    <ToastPrimitives.Action
      {...rest}
      ref={ref}
      className={[
        "col-start-2 justify-self-start",
        "mt-[var(--space-xs)]",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

ToastAction.displayName = "ToastAction";

export interface ToastCloseProps
  extends Omit<ComponentPropsWithoutRef<typeof ToastPrimitives.Close>, "asChild"> {
  "aria-label"?: string;
}

export const ToastClose = forwardRef<
  ElementRef<typeof ToastPrimitives.Close>,
  ToastCloseProps
>(function ToastClose({ className, "aria-label": ariaLabel = "닫기", ...rest }, ref) {
  return (
    <ToastPrimitives.Close
      {...rest}
      ref={ref}
      aria-label={ariaLabel}
      className={[
        "col-start-3 row-start-1 self-start",
        "inline-flex items-center justify-center shrink-0",
        "size-[24px] p-0 m-0",
        "bg-transparent border-0 cursor-pointer",
        "text-[var(--color-text-tertiary)]",
        "hover:text-[var(--color-text-primary)]",
        "rounded-[var(--radius-sm)]",
        "transition-colors duration-[var(--motion-duration-fast)]",
        "[transition-timing-function:var(--motion-easing-standard)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-[var(--color-brand-500)]",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden="true" className="inline-flex items-center justify-center size-[16px]">
        <CloseIcon />
      </span>
    </ToastPrimitives.Close>
  );
});

ToastClose.displayName = "ToastClose";
