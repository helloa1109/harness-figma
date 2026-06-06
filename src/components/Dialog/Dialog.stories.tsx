import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./Dialog";
import { Button } from "../Button";

const VARIANTS = ["default", "alert", "destructive"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    size: { control: "inline-radio", options: SIZES },
  },
  args: { variant: "default", size: "md" },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogTitle>변경사항을 저장할까요?</DialogTitle>
        <DialogDescription>저장하지 않으면 변경 내용이 사라집니다.</DialogDescription>
        <DialogFooter>
          <DialogClose asChild><Button variant="secondary">취소</Button></DialogClose>
          <DialogClose asChild><Button>저장</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Alert: Story = {
  args: { variant: "alert" },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild><Button variant="secondary">Open alert</Button></DialogTrigger>
      <DialogContent>
        <DialogTitle>세션 만료 임박</DialogTitle>
        <DialogDescription>5분 후 자동 로그아웃됩니다. 계속 사용하시려면 연장하세요.</DialogDescription>
        <DialogFooter>
          <DialogClose asChild><Button variant="ghost">로그아웃</Button></DialogClose>
          <DialogClose asChild><Button>세션 연장</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild><Button variant="danger">계정 삭제</Button></DialogTrigger>
      <DialogContent>
        <DialogTitle>정말 삭제할까요?</DialogTitle>
        <DialogDescription>이 작업은 되돌릴 수 없습니다. 계정과 모든 데이터가 영구 삭제됩니다.</DialogDescription>
        <DialogFooter>
          <DialogClose asChild><Button variant="secondary">취소</Button></DialogClose>
          <DialogClose asChild><Button variant="danger">삭제</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)" }}>
      {SIZES.map((size) => (
        <Dialog key={size} size={size}>
          <DialogTrigger asChild><Button variant="secondary">size={size}</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>Size {size}</DialogTitle>
            <DialogDescription>
              size={size}의 다이얼로그입니다. sm=320px, md=480px, lg=640px 폭으로 표시됩니다.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild><Button variant="secondary">닫기</Button></DialogClose>
              <DialogClose asChild><Button>확인</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

export const VariantMatrix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)" }}>
      {VARIANTS.map((variant) => (
        <Dialog key={variant} variant={variant}>
          <DialogTrigger asChild><Button variant="secondary">variant={variant}</Button></DialogTrigger>
          <DialogContent>
            <DialogTitle>{variant}</DialogTitle>
            <DialogDescription>variant={variant} 다이얼로그입니다.</DialogDescription>
            <DialogFooter>
              <DialogClose asChild><Button variant="secondary">취소</Button></DialogClose>
              <DialogClose asChild>
                <Button variant={variant === "destructive" ? "danger" : "primary"}>확인</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [open, setOpen] = useState(false);
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <Button onClick={() => setOpen(true)}>Open via state</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogTitle>제어 모드</DialogTitle>
              <DialogDescription>open/onOpenChange로 외부 상태 관리.</DialogDescription>
              <DialogFooter>
                <DialogClose asChild><Button>닫기</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
      <Dialog variant="destructive" size="sm">
        <DialogTrigger asChild><Button variant="danger">계정 삭제</Button></DialogTrigger>
        <DialogContent>
          <DialogTitle>계정을 삭제할까요?</DialogTitle>
          <DialogDescription>되돌릴 수 없는 작업입니다.</DialogDescription>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">취소</Button></DialogClose>
            <DialogClose asChild><Button variant="danger">삭제</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog size="md">
        <DialogTrigger asChild><Button>변경사항 저장</Button></DialogTrigger>
        <DialogContent>
          <DialogTitle>저장할까요?</DialogTitle>
          <DialogDescription>변경한 내용을 이 여행에 반영합니다.</DialogDescription>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">취소</Button></DialogClose>
            <DialogClose asChild><Button>저장</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog variant="alert" size="sm">
        <DialogTrigger asChild><Button variant="secondary">세션 알림</Button></DialogTrigger>
        <DialogContent>
          <DialogTitle>곧 만료</DialogTitle>
          <DialogDescription>세션이 5분 후 만료됩니다.</DialogDescription>
          <DialogFooter>
            <DialogClose asChild><Button>연장</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
