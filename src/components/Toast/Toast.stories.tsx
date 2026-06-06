import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from "./Toast";
import { Button } from "../Button";

const VARIANTS = ["info", "success", "warning", "danger"] as const;

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
  },
  args: { variant: "info" },
};

export default meta;
type Story = StoryObj<typeof Toast>;

function ToastDemo({
  variant,
  title,
  description,
  actionLabel,
  trigger = "Show toast",
}: {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
  description: string;
  actionLabel?: string;
  trigger?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ToastProvider duration={5000} swipeDirection="right">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          setOpen(false);
          window.setTimeout(() => setOpen(true), 50);
        }}
      >
        {trigger}
      </Button>
      <Toast variant={variant} open={open} onOpenChange={setOpen}>
        {title && <ToastTitle>{title}</ToastTitle>}
        <ToastDescription>{description}</ToastDescription>
        {actionLabel && (
          <ToastAction altText={actionLabel} asChild>
            <Button size="sm" variant="ghost">{actionLabel}</Button>
          </ToastAction>
        )}
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const Info: Story = {
  render: () => <ToastDemo description="새로운 업데이트가 있어요." />,
};
export const Success: Story = {
  render: () => <ToastDemo variant="success" description="변경사항이 저장됐어요." />,
};
export const Warning: Story = {
  render: () => <ToastDemo variant="warning" description="결제 수단이 곧 만료됩니다." />,
};
export const Danger: Story = {
  render: () => <ToastDemo variant="danger" description="전송에 실패했어요." />,
};

export const WithTitle: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="결제 완료"
      description="주문번호 ORD-12345"
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="결제 완료"
      description="주문번호 ORD-12345"
      actionLabel="영수증 보기"
    />
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-sm)" }}>
      <ToastDemo variant="info" description="info" trigger="info" />
      <ToastDemo variant="success" description="success" trigger="success" />
      <ToastDemo variant="warning" description="warning" trigger="warning" />
      <ToastDemo variant="danger" description="danger" trigger="danger" />
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", alignItems: "flex-start" }}>
      <ToastDemo variant="success" description="변경사항이 저장됐어요." trigger="저장 완료" />
      <ToastDemo variant="danger" title="전송 실패" description="잠시 후 다시 시도해주세요." trigger="전송 실패" />
      <ToastDemo variant="info" description="새로운 업데이트가 있어요." trigger="업데이트 알림" />
      <ToastDemo variant="warning" title="주의" description="결제 수단이 곧 만료됩니다." trigger="결제 수단 경고" />
      <ToastDemo variant="success" title="결제 완료" description="주문번호 ORD-12345" actionLabel="영수증 보기" trigger="결제 + Action" />
    </div>
  ),
};
