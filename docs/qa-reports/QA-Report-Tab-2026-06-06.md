# QA Report — Tab (Radix Tabs 두 번째 도입)

- 날짜: 2026-06-06
- 코드: `src/components/Tab/Tab.tsx`, `index.ts`, `Tab.stories.tsx`
- Figma: TabItem `155:83`, TabsList `156:89` / Docs `158:345`, `159:400`
- Radix: `@radix-ui/react-tabs@1.1.14`

## 1. 요약

| Severity | 건수 |
|---|---|
| Critical | 0 |
| High | 2 |
| Medium | 4 |
| Low | 3 |
| Pass | 다수 |

핵심:
- 24 variants(TabItem 18 + TabsList 6) 시안 정합성 OK.
- 토큰 준수 OK. Trigger height 32/40/48px만 명시 px (8pt grid 정렬, IconButton 예외와 동일).
- Radix 활용 정석. Root/List/Trigger/Content + `data-state="active"` + Context 모두 적절.
- 다크모드 자동 동작 OK.

## 2. 발견 사항

### High

**H1. `<Tabs style="...">` 네이밍 — `variant`로 변경 권장**
- 위치: `Tab.tsx:23`, `index.ts:7`
- 사유: `style`은 HTMLAttributes 글로벌 속성. IDE 자동완성/타입 추론에서 CSS `style`과 혼동. Badge 등 자체 컴포넌트는 모두 `variant` 사용 중이라 컨벤션 불일치.
- 픽스: `style` → `variant` 리네이밍. Context 내부 `styleVariant` → `variant`로 단순화.

**H2. `TabsContent` focus-visible outline 정책 명시**
- 위치: `Tab.tsx:170-173`
- Radix가 빈 panel에 `tabindex=0` 자동 부여 → 키보드 포커스 시 outline. 시안엔 panel outline 미정의지만 a11y 우선이라 유지가 맞음.
- 픽스: 의도 주석 1줄 추가.

### Medium

**M1. Trigger height 32/40/48 디자인 결정 기록**
- 시안은 30/39/49 (underline) / 32/41/51 (filled). 코드는 8pt grid + IconButton과 일관성을 위해 32/40/48 통일.
- 픽스: `Tab.tsx:92-96` 주석 + DESIGN.md "예외 허용" 사례에 한 줄 추가.

**M2. Active tab의 disabled 시 panel 잠금 처리 미문서화**
- Radix는 키보드 네비에서만 스킵, 활성 panel은 그대로. 우리는 미처리.
- 픽스: Storybook 주석으로 가이드 ("active tab을 disabled로 만들지 말 것"). 별도 PR.

**M3. `orientation="vertical"` 스토리 부재** — 별도 PR.

**M4. focus-ring 토큰화** — 6번째 사례, DESIGN.md §8에서 이미 추적 중. 별도 PR.

### Low
- L1. `TabsList`에 `aria-label` 권장 예시 Storybook 추가.
- L2. Long label 케이스 Storybook 추가.
- L3. `TabsList`의 underline은 `w-full`, filled는 `inline-flex` 의도 차이 주석.

## 3. Switch ↔ Tabs 비교 (Radix 도입 회고)

**공통 표준 템플릿 확정**
- namespace import (`import * as XxxPrimitives`)
- `Omit<ComponentPropsWithoutRef<typeof X>, "asChild">`
- `forwardRef<ElementRef<typeof X>, Props>`
- `data-state` 기반 Tailwind 분기 — JS 분기 0
- focus-visible outline 동일 패턴

**차이 — 단일 vs 복합**

| 측면 | Switch (단일) | Tabs (복합) |
|---|---|---|
| primitive 수 | 2 (Root + Thumb) | 4 (Root + List + Trigger + Content) |
| 합성 위치 | 컴포넌트 내부 | 사용자 외부 합성 |
| size/variant 전달 | props 직접 | **Context** |
| 사용자 호출 | `<Switch size="sm" />` | `<Tabs size="sm">` 한 번 → 자식 재전달 불필요 |

**다음 Radix 후보 시사점** (Dialog/Toast 등)
- 복합은 Context 필수. Tabs에서 검증한 default값 + Omit asChild + forwardRef 조합 그대로 재사용.

## 4. 즉시 픽스 권장 (이번 PR)
1. H1 — `style` → `variant` 리네이밍
2. H2 — TabsContent outline 의도 주석
3. M1 — Trigger height 주석 + DESIGN.md 한 줄

## 5. 별도 PR 후보
- M2 (active+disabled 가이드), M3 (Vertical 스토리), M4 (focus-ring 토큰), L1/L2/L3
