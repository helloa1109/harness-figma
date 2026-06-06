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

### 신설 토큰 (`src/tokens/semantic-extras.css`, 수동 관리)
- `--focus-ring-width/offset/color` ✅ (8개 컴포넌트 적용)
- `--font-weight-semibold(600)` ✅ (Badge 적용)
- `--shadow-card-rest/hover` ✅ (Card 적용)
- `--shadow-dialog` ✅ (Dialog 적용)
- `--shadow-overlay` ✅ (Toast 적용)
- `--shadow-thumb` ✅ (Switch 적용)
- `--color-feedback-surface-{success,warning,danger}` ✅ (Toast 다크모드 분기)

### 누락된 토큰 (별도 PR 후보)
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
| 6 | Skeleton | `148:56` | `151:333` | `src/components/Skeleton/Skeleton.tsx` | 27 | ❌ | `fb7d447` |
| 7 | TabItem | `155:83` | `158:345` | `src/components/Tab/Tab.tsx` | 18 | ✅ `@radix-ui/react-tabs` | `fb7d447` |
| 7 | TabsList | `156:89` | `159:400` | `src/components/Tab/Tab.tsx` | 6 | ✅ `@radix-ui/react-tabs` | `fb7d447` |
| 8 | Button | `166:293` | `185:621` | `src/components/Button/Button.tsx` | 36 | ❌ | (pending) |
| 9 | Card | `179:101` | `186:709` | `src/components/Card/Card.tsx` | 18 | ❌ | (pending) |
| 10 | Avatar | `167:455` | `176:541` | `src/components/Avatar/Avatar.tsx` | 72 | ❌ | `3d1df2f` |
| 11 | Dialog | `199:217` | `203:837` | `src/components/Dialog/Dialog.tsx` | 9 | ✅ `@radix-ui/react-dialog` | (pending) |
| 12 | Toast | `196:169` | `200:721` | `src/components/Toast/Toast.tsx` | 16 | ✅ `@radix-ui/react-toast` | `6c565a2` |

**기타 (시드 외)**
- ~~`src/components/ui/Button.tsx`~~ (제거됨, fa1b3c3)
- `src/components/ui/TextField.tsx` (시드 1, 향후 디렉터리 통일 시 이동)
- `src/components/ui/TripCard.tsx` (데모용)

### 슬롯 시스템 (균일 200px gap 동적 좌표)

새 컴포넌트는 **마지막 컴포넌트 우측 끝 + 200px**에 배치. 시각적으로 균일 gap. 좌표는 아래 표에 직접 기록 (계산 X, race 0).

**Documentation 페이지 (87:123, y=-16)**

| N | 컴포넌트 | x | width |
|---|---|---|---|
| 1 | TextField | 0 | 1624 |
| 2 | Badge | 1824 | 1068 |
| 3 | Checkbox | 3092 | 1028 |
| 4 | Switch | 4320 | 716 |
| 5 | IconButton | 5236 | 833 |
| 6 | Skeleton | 6269 | 1384 |
| 7 | TabItem | 7853 | 1040 |
| 8 | TabsList | 9093 | 1440 |
| 9 | Button | 10733 | 806 |
| 10 | Card | 11739 | 1384 |
| 11 | Avatar | 13323 | 1168 |
| 12 | Dialog | 14691 | 1672 |
| 13 | Toast | 16563 | 2158 |

**Components 페이지 (87:122, y=0)** — N=1 TextField는 격자 0~720 (240×3개), 그 외는 각 Component Set 우측 끝 + 200

| N | 컴포넌트 | x | width |
|---|---|---|---|
| 2 | Badge | 1000 | 700 |
| 3 | Checkbox | 1900 | 118 |
| 4 | Switch | 2218 | 142 |
| 5 | IconButton | 2560 | 112 |
| 6 | Skeleton | 2872 | 304 |
| 7 | TabItem | 3376 | 900 |
| 8 | TabsList | 4476 | 340 |
| 9 | Button | 5016 | 184 |
| 10 | Card | 5400 | 1848 |
| 11 | Avatar | 7448 | 1200 |
| 12 | Dialog | 8848 | 2600 |
| 13 | Toast | 11648 | 1584 |

**새 컴포넌트 추가 시 (N=14~)**
1. 마지막 컴포넌트 좌표 + width + 200 으로 새 x 계산
2. 위 표에 새 행 추가
3. 에이전트에 명시 좌표 전달 (Components/Documentation 각각)

**병렬 호출 시**: 메인이 두 컴포넌트 좌표를 미리 계산해 각 에이전트에 명시 전달. 다른 좌표라 절대 안 겹침.

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

## 8. 미해결 후속 작업

**PR-A 토큰 일괄 신설 완료** (focus-ring/shadow/feedback-surface/font-weight-semibold).

남은 작업:
1. **디렉터리 통일** — TextField만 `ui/` 위치, 나머지는 `{Name}/` (PR-B)
2. **Dialog 인라인 keyframes → tailwindcss-animate 통일** (PR-B)
3. **`--color-action-bg-ghost-hover` 토큰** — IconButton 다크모드 어포던스 (PR-C)
4. **Storybook dark mode addon** — `prefers-color-scheme` 미디어쿼리를 Storybook decorator로 트리거 (PR-C)
5. **Checkbox → Radix 마이그레이션** — Switch 효과 검증됐으니 후보 (별도)
6. **각 QA Medium/Low 잔여** (PR-C)
