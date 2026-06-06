# Design System Blueprint

이 파일은 디자인 시스템의 **단일 진실 원천(SSOT)**. Claude/에이전트가 매 호출마다 자동 읽음 → Figma metadata 조회 비용 절감.

**소스 변경 시 갱신 필수**: 토큰 추가, 컴포넌트 신규/Figma node ID 변경, 디렉터리 구조 변경.

---

## 1. Figma 파일

- **파일 키**: `B138LEBl3Li7yNGdSpIuq6`
- **URL**: https://www.figma.com/design/B138LEBl3Li7yNGdSpIuq6/
- **페이지**:
  | 페이지 | ID | 용도 |
  |---|---|---|
  | Foundations | `0:1` | 토큰 swatch (Color/Typography/Radius/Semantic) |
  | Components | `87:122` | raw Component / Component Set |
  | Documentation | `87:123` | `<Name> — Documentation` frames |

---

## 2. 디자인 토큰 카탈로그

토큰 정의는 `src/tokens/`에 위치 (직접 편집 금지, `/build-tokens` 커맨드로만 갱신).

### Colors (`src/tokens/colors.css`)

**Primitive (모드 무관)**
- `--color-brand-{50..900}` (Coral/Orange, 50~900 10단계)
- `--color-neutral-{0,50,100,200,300,400,500,600,700,800,900}` (Gray)
- `--color-success-{50..900}` (Green)
- `--color-warning-{50..900}` (Amber)
- `--color-danger-{50..900}` (Red)
- `--color-neutral-opacity-{50..900}` (Grey Opacity 시퀀스)

**Semantic (모드 분기)** — `prefers-color-scheme: dark` 미디어쿼리로 자동 전환
- Action: `--color-action-bg-default/hover/pressed`, `--color-action-text-brand/on-brand`
- Text: `--color-text-primary/secondary/tertiary/brand`
- Surface: `--color-surface-default/subtle/muted`
- Border: `--color-border-default/strong`

### Spacing (`src/tokens/spacing.css`, 8pt grid)
- `--space-xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48)`

### Radius
- `--radius-none(0) xs(2) sm(4) md(8) lg(12) xl(16) 2xl(24) full(9999)`

### Border Width
- `--border-width-thin(1) base(2) strong(4)`

### Opacity
- `--opacity-disabled(0.4) hover(0.85)`

### Typography (`src/tokens/typography.css`)
- Font: `--font-sans` (Pretendard), `--font-mono`
- Size: `--font-size-xs(12) sm(14) base(16) lg(18) xl(24) 2xl(32)`
- Line-height: `--line-height-tight(1.2) base(1.5) loose(1.75)`
- Weight: `--font-weight-normal(400) medium(500) bold(700)`

### Motion (`src/tokens/motion.css`)
- Duration: `--motion-duration-fast(120ms) base(200ms) slow(320ms)`
- Easing: `--motion-easing-standard`, `--motion-easing-emphasized`

### 누락된 토큰 (별도 PR 후보)
- `--font-weight-semibold(600)` (Badge에서 우회 중)
- `--shadow-thumb` (Switch 인라인 사용 중)
- `--focus-ring-width/offset/color` (5개 컴포넌트 하드코딩 중)
- ghost variant hover 전용 토큰 (IconButton 다크모드)

---

## 3. 컴포넌트 카탈로그 (시드 라인업 완료)

| # | 컴포넌트 | Figma Node ID | Documentation Frame | 코드 경로 | Variants | Radix | 커밋 |
|---|---|---|---|---|---|---|---|
| 1 | TextField | (legacy) | — | `src/components/ui/TextField.tsx` | 15 | ❌ | `01a9c5b` |
| 2 | Badge | `96:50` | `99:122` | `src/components/Badge/Badge.tsx` | 24 | ❌ | `dbe92ff` |
| 3 | Checkbox | `110:86` | `117:151` | `src/components/Checkbox/Checkbox.tsx` | 12 | ❌ | `a566ff6` |
| 4 | Switch | `128:66` | `130:230` | `src/components/Switch/Switch.tsx` | 16 | ✅ `@radix-ui/react-switch` | `fc40493` |
| 5 | IconButton | `137:38` | `141:333` | `src/components/IconButton/IconButton.tsx` | 18 | ❌ | `377279b` |
| 6 | Skeleton | `148:56` | `151:333` | `src/components/Skeleton/Skeleton.tsx` | 27 | ❌ | (pending) |
| 7 | TabItem | `155:83` | `158:345` | `src/components/Tab/Tab.tsx` | 18 | ✅ `@radix-ui/react-tabs` | (pending) |
| 7 | TabsList | `156:89` | `159:400` | `src/components/Tab/Tab.tsx` | 6 | ✅ `@radix-ui/react-tabs` | (pending) |

**기타 (시드 외)**
- `src/components/ui/Button.tsx` (초기 prototype)
- `src/components/ui/TripCard.tsx` (데모용)

---

## 4. 컨벤션 (모든 신규 컴포넌트 동일)

### 디렉터리
```
src/components/{Name}/
├── {Name}.tsx           ← 컴포넌트 본체
├── {Name}.stories.tsx   ← Storybook 9~11 스토리
└── index.ts             ← barrel re-export (named + type)
```
- **예외**: TextField는 `src/components/ui/` (시드 1번, 향후 통일 별도 PR)

### 코드 규약
- `forwardRef<HTMLElement, Props>(function ComponentName(...) { ... })`
- `ComponentName.displayName = "ComponentName"`
- **하드코딩 금지**: 모든 컬러/spacing/radius/border-width/font-size를 CSS 변수로
- **예외 허용**: 시안에 명시된 정확한 px 값 (예: Switch thumb 14/20px, IconButton box 32/40/48px)
- Tailwind arbitrary value 패턴: `bg-[var(--color-brand-500)]`, `rounded-[var(--radius-sm)]`
- TypeScript: `npx tsc --noEmit` 통과 필수

### Storybook 스토리 (필수 구성)
- `Default`
- 주요 variant별 스토리 (Primary, Success 등)
- `SizeMatrix` / `StateMatrix` / `VariantMatrix` / `FullMatrix`
- `RealWorldExamples`
- `DarkMode` (decorator + colorScheme)
- a11y 가이드 필요 시 별도 스토리 + `parameters.docs.description`

### a11y 룰
- 아이콘만 있는 버튼: `aria-label` 타입에서 필수화
- focus-visible 시각 피드백 필수 (현재 `outline-[var(--color-brand-500)]` 하드코딩)
- native 폼 요소 우선 (input/button/label)

---

## 5. Radix 도입 정책

**도입 조건 (둘 다 충족)**
1. 자체 구현 시 a11y 복잡 (focus trap, ARIA state, 키보드 네비)
2. Radix가 해당 컴포넌트를 제공

**도입 후보 (Tier 2~3)**
- Dialog, Sheet, Drawer → `@radix-ui/react-dialog`
- Popover → `@radix-ui/react-popover`
- Tooltip → `@radix-ui/react-tooltip`
- Select → `@radix-ui/react-select`
- Toast → `@radix-ui/react-toast`
- Tabs → `@radix-ui/react-tabs`
- Checkbox(마이그레이션 후보) → `@radix-ui/react-checkbox`

**미도입 (native로 충분)**
- Badge, IconButton, TextField (native input/button)
- Skeleton (단순 div)

---

## 6. 컴포넌트 사이클 (워크플로)

```
/build-component {Name}  →  /implement-figma  →  /gen-stories  →  /qa  →  픽스  →  커밋
(figma-component-builder)   (figma-implementer)  (gen-stories)    (qa-reporter)
```

### 좌표 충돌 방지 (figma-component-builder)
- Components 페이지(87:122)와 Documentation 페이지(87:123)에 신규 frame 추가 시
- `get_metadata`로 기존 frame 우측 끝(`rightmost_x = max(child.x + child.width)`) 계산
- 신규 frame 시작 x = `rightmost_x + 200`
- y는 첫 frame과 동일 baseline

### QA 리포트
- 저장: `docs/qa-reports/QA-Report-{컴포넌트}-{YYYY-MM-DD}.md`
- 분류: Critical / High / Medium / Low
- Critical/High는 즉시 픽스, Medium/Low는 별도 PR 후보로 로그

---

## 7. Tier 분류 (다음 작업 후보)

### Tier 2 (다음 사이클)
- **Skeleton** (자체) — 로딩 placeholder
- **Dialog** (shadcn/Radix) — focus trap + ESC + scroll lock
- **Toast** (shadcn/Radix) — 큐 관리 + swipe 닫기
- **Tab** (shadcn/Radix) — 키보드 네비

### Tier 3
- Tooltip, Progress Bar, Stepper, Search Field, Segmented Control, Slider, Menu

### 보류 (모바일/금융 도메인)
- BottomCTA, Bottom Sheet, Keypad 시리즈, Agreement, Asset, SplitTextField

---

## 8. 미해결 후속 작업 (시드 5개 후 별도 PR 후보)

1. **focus-ring 토큰** (`--focus-ring-width/offset/color`) — 5개 컴포넌트 공통 하드코딩
2. **디렉터리 통일** — TextField만 `ui/` 위치, 나머지는 `{Name}/`
3. **`--shadow-thumb` 토큰** — Switch 인라인 box-shadow 교체
4. **`--font-weight-semibold` 토큰** — Badge 우회 해소
5. **`--color-action-bg-ghost-hover` 토큰** — IconButton 다크모드 어포던스
6. **Storybook dark mode addon** — `prefers-color-scheme` 미디어쿼리를 Storybook decorator로 트리거
7. **Checkbox → Radix 마이그레이션** — Switch 효과 검증됐으니 후보
