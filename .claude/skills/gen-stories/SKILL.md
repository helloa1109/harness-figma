---
name: gen-stories
description: 컴포넌트의 Storybook story 파일을 일괄 생성합니다. 컴포넌트 props를 자동 추출하여 default / variants / playground 스토리를 만듭니다.
---

# gen-stories 스킬

## 언제 사용?
- 사용자가 "story 만들어줘", "스토리북 추가" 라고 요청할 때
- 새 컴포넌트 작성 후 자동 보강 단계로

## 작업 절차
1. 대상 `.tsx` 파일을 읽어 `interface XxxProps`를 추출
2. props 타입을 기반으로 Storybook v8 형식의 `*.stories.tsx` 생성
3. 동일 디렉토리에 저장
4. variants가 enum이면 모든 값에 대해 별도 스토리 자동 추가

## 출력 템플릿
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./ComponentName";

const meta: Meta<typeof ComponentName> = {
  component: ComponentName,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ComponentName>;

export const Default: Story = { args: { /* ... */ } };
```
