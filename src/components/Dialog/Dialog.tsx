import { createContext, forwardRef, useContext } from "react";
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { IconButton } from "../IconButton";

export type DialogVariant = "default" | "alert" | "destructive";
export type DialogSize = "sm" | "md" | "lg";

type DialogContextValue = {
  variant: DialogVariant;
  size: DialogSize;
};

const DialogContext = createContext<DialogContextValue>({
  variant: "default",
  size: "md",
});

const useDialogContext = () => useContext(DialogContext);

export interface DialogProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitives.Root> {
  variant?: DialogVariant;
  size?: DialogSize;
}

export function Dialog({
  variant = "default",
  size = "md",
  children,
  ...rest
}: DialogProps) {
  return (
    <DialogContext.Provider value={{ variant, size }}>
      <DialogPrimitives.Root {...rest}>{children}</DialogPrimitives.Root>
    </DialogContext.Provider>
  );
}

Dialog.displayName = "Dialog";

export type DialogTriggerProps = ComponentPropsWithoutRef<
  typeof DialogPrimitives.Trigger
>;

export const DialogTrigger = forwardRef<
  ElementRef<typeof DialogPrimitives.Trigger>,
  DialogTriggerProps
>(function DialogTrigger(props, ref) {
  return <DialogPrimitives.Trigger {...props} ref={ref} />;
});

DialogTrigger.displayName = "DialogTrigger";

const SIZE_WIDTH: Record<DialogSize, string> = {
  sm: "max-w-[320px]",
  md: "max-w-[480px]",
  lg: "max-w-[640px]",
};

const OVERLAY_CLASS = [
  "fixed inset-0 z-50",
  "bg-[var(--color-neutral-opacity-500)]",
  "data-[state=open]:animate-[dialogFadeIn_var(--motion-duration-base)_var(--motion-easing-standard)]",
  "data-[state=closed]:animate-[dialogFadeOut_var(--motion-duration-fast)_var(--motion-easing-standard)]",
].join(" ");

const CONTENT_CLASS = [
  "fixed left-1/2 top-1/2 z-50",
  "-translate-x-1/2 -translate-y-1/2",
  "w-[calc(100vw-var(--space-xl))]",
  "flex flex-col",
  "gap-[var(--space-lg)]",
  "p-[var(--space-xl)]",
  "rounded-[var(--radius-xl)]",
  "bg-[var(--color-surface-default)]",
  "font-[family-name:var(--font-sans)]",
  "focus:outline-none",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  "focus-visible:outline-[var(--color-brand-500)]",
  "data-[state=open]:animate-[dialogContentIn_var(--motion-duration-base)_var(--motion-easing-emphasized)]",
  "data-[state=closed]:animate-[dialogContentOut_var(--motion-duration-fast)_var(--motion-easing-standard)]",
].join(" ");

const KEYFRAMES_CSS = `
@keyframes dialogFadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes dialogFadeOut { from { opacity: 1 } to { opacity: 0 } }
@keyframes dialogContentIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.96) }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1) }
}
@keyframes dialogContentOut {
  from { opacity: 1; transform: translate(-50%, -50%) scale(1) }
  to   { opacity: 0; transform: translate(-50%, -50%) scale(0.98) }
}
`;

export interface DialogContentProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DialogPrimitives.Content>,
    "asChild"
  > {
  /** Overlay에 추가 className */
  overlayClassName?: string;
  /** Portal container */
  container?: HTMLElement | null;
  /** 우상단 X 닫기 버튼 숨김 (기본 노출) */
  hideCloseButton?: boolean;
  /** X 버튼 aria-label */
  closeLabel?: string;
}

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitives.Content>,
  DialogContentProps
>(function DialogContent(
  {
    className,
    overlayClassName,
    container,
    children,
    style,
    hideCloseButton = false,
    closeLabel = "닫기",
    ...rest
  },
  ref,
) {
  const { size } = useDialogContext();
  return (
    <DialogPrimitives.Portal container={container ?? undefined}>
      <style>{KEYFRAMES_CSS}</style>
      <DialogPrimitives.Overlay
        className={[OVERLAY_CLASS, overlayClassName ?? ""]
          .filter(Boolean)
          .join(" ")}
      />
      <DialogPrimitives.Content
        {...rest}
        ref={ref}
        style={{
          boxShadow: "0 16px 32px var(--color-neutral-opacity-200)",
          ...style,
        }}
        className={[CONTENT_CLASS, SIZE_WIDTH[size], "relative", className ?? ""]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitives.Close asChild>
            <IconButton
              variant="ghost"
              size="sm"
              icon={<CloseIcon />}
              aria-label={closeLabel}
              className="absolute right-[var(--space-md)] top-[var(--space-md)]"
            />
          </DialogPrimitives.Close>
        )}
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  );
});

DialogContent.displayName = "DialogContent";

function AlertIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ color: "var(--color-warning-500)" }}
    >
      <path
        d="M12 3 1.5 21h21L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 10v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function DestructiveIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ color: "var(--color-danger-500)" }}
    >
      <path
        d="M7.5 3h9L21 7.5v9L16.5 21h-9L3 16.5v-9L7.5 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 8v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

const VARIANT_ICON: Record<DialogVariant, ReactNode> = {
  default: null,
  alert: <AlertIcon />,
  destructive: <DestructiveIcon />,
};

const TITLE_CLASS = [
  "inline-flex items-center gap-[var(--space-sm)]",
  "text-[var(--color-text-primary)]",
  "text-[length:var(--font-size-xl)]",
  "font-[number:var(--font-weight-bold)]",
  "leading-[var(--line-height-tight)]",
  "m-0",
].join(" ");

export type DialogTitleProps = Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitives.Title>,
  "asChild"
>;

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitives.Title>,
  DialogTitleProps
>(function DialogTitle({ className, children, ...rest }, ref) {
  const { variant } = useDialogContext();
  const icon = VARIANT_ICON[variant];
  return (
    <DialogPrimitives.Title
      {...rest}
      ref={ref}
      className={[TITLE_CLASS, className ?? ""].filter(Boolean).join(" ")}
    >
      {icon && (
        <span className="inline-flex shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </DialogPrimitives.Title>
  );
});

DialogTitle.displayName = "DialogTitle";

const DESCRIPTION_CLASS = [
  "text-[var(--color-text-secondary)]",
  "text-[length:var(--font-size-base)]",
  "font-[number:var(--font-weight-medium)]",
  "leading-[var(--line-height-base)]",
  "m-0",
].join(" ");

export type DialogDescriptionProps = Omit<
  ComponentPropsWithoutRef<typeof DialogPrimitives.Description>,
  "asChild"
>;

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitives.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, ...rest }, ref) {
  return (
    <DialogPrimitives.Description
      {...rest}
      ref={ref}
      className={[DESCRIPTION_CLASS, className ?? ""]
        .filter(Boolean)
        .join(" ")}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

const FOOTER_CLASS = [
  "flex items-center justify-end",
  "gap-[var(--space-sm)]",
  "mt-[var(--space-sm)]",
].join(" ");

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ className, ...rest }, ref) {
    return (
      <div
        {...rest}
        ref={ref}
        className={[FOOTER_CLASS, className ?? ""].filter(Boolean).join(" ")}
      />
    );
  },
);

DialogFooter.displayName = "DialogFooter";

function CloseIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface DialogCloseProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitives.Close> {
  /** 별도 트리거가 없을 때 우상단 X 버튼 노출 (asChild 미사용 시) */
  showIconButton?: boolean;
  /** showIconButton일 때 IconButton 접근성 라벨 */
  iconLabel?: string;
}

export const DialogClose = forwardRef<
  ElementRef<typeof DialogPrimitives.Close>,
  DialogCloseProps
>(function DialogClose(
  { showIconButton, iconLabel = "닫기", children, asChild, ...rest },
  ref,
) {
  if (showIconButton) {
    return (
      <DialogPrimitives.Close {...rest} ref={ref} asChild>
        <IconButton
          variant="ghost"
          size="sm"
          icon={<CloseIcon />}
          aria-label={iconLabel}
        />
      </DialogPrimitives.Close>
    );
  }
  return (
    <DialogPrimitives.Close {...rest} ref={ref} asChild={asChild}>
      {children}
    </DialogPrimitives.Close>
  );
});

DialogClose.displayName = "DialogClose";
