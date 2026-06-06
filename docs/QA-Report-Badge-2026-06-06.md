# Badge QA Report — 2026-06-06

대상: `src/components/Badge/Badge.tsx`, `index.ts`, `Badge.stories.tsx`
Figma 원본: `B138LEBl3Li7yNGdSpIuq6` / Component Set `96:50` (6 variant × 2 size × 2 style = 24)
Documentation frame: `99:122`
참고: 시드 라인업 2번째 (1번 TextField QA는 `docs/QA-Report-TextField-2026-06-06.md`)

---

## 1. 요약

| 카테고리 | Pass | Warn | Fail |
|---|---|---|---|
| Figma 정합성 (24조합 토큰 매핑) | 22 | 2 | 0 |
| 토큰 사용 | 5 | 1 | 1 |
| 접근성 | 3 | 2 | 1 |
| 다크모드 | 3 | 2 | 0 |
| TextField와 일관성 | 3 | 0 | 1 |
| Storybook 커버리지 | 6 | 2 | 0 |
| **합계** | **42** | **9** | **3** |

### Critical / High

- **[Critical] T-1** `font-semibold` Tailwind 유틸리티 직접 사용 — 토큰(`--font-weight-*`) 미경유. 게다가 `colors.css`/`typography.css`에는 600(SemiBold) 토큰이 없어 Figma의 `Inter SemiBold`와 의미 매핑 불가. (`Badge.tsx:81`)
- **[High] A-1** `<span>` 으로만 렌더 — 숫자 Badge(`<Badge>3</Badge>`)에 스크린리더 컨텍스트가 0. `aria-label` 패턴 가이드 부재. (`Badge.tsx:94`)
- **[High] C-1** 경로 일관성 깨짐: TextField는 `src/components/ui/TextField.tsx`, Badge는 `src/components/Badge/Badge.tsx`. 동일 시드 라인업 내에서 디렉터리 구조가 갈림 — 향후 import 경로/배럴 패턴 충돌 우려.
- **[High] V-1** `leading-none`(line-height:1) vs Figma `leading-[normal]`(~1.2). Semi Bold 폰트는 디센더 잘림 위험 — 특히 md size에서 g/p/y 가 들어간 라벨에서 1~2px 잘림 가능성.

---

## 2. 항목별 상세

### 2.1 Figma ↔ 코드 정합성 (24조합 토큰 매핑)

Figma `get_variable_defs` (96:50)로 가져온 raw 토큰 vs 코드 매핑 전수 대조:

| 조합 | Figma BG | 코드 BG | Figma Text | 코드 Text | 판정 |
|---|---|---|---|---|---|
| default sm/solid | `neutral/800` | `--color-neutral-800` | `neutral/0` | `--color-neutral-0` | Pass |
| default sm/soft | `neutral/100` | `--color-neutral-100` | `neutral/800` | `--color-neutral-800` | Pass |
| default md/solid | `neutral/800` | `--color-neutral-800` | `neutral/0` | `--color-neutral-0` | Pass |
| default md/soft | `neutral/100` | `--color-neutral-100` | `neutral/800` | `--color-neutral-800` | Pass |
| primary sm/solid | `brand/500` | `--color-brand-500` | `neutral/0` | `--color-neutral-0` | Pass |
| primary sm/soft | `brand/50` | `--color-brand-50` | `brand/700` | `--color-brand-700` | Pass |
| primary md/solid | `brand/500` | `--color-brand-500` | `neutral/0` | `--color-neutral-0` | Pass |
| primary md/soft | `brand/50` | `--color-brand-50` | `brand/700` | `--color-brand-700` | Pass |
| success sm/solid | `success/500` | `--color-success-500` | `neutral/0` | `--color-neutral-0` | Pass |
| success sm/soft | `success/50` | `--color-success-50` | `success/700` | `--color-success-700` | Pass |
| success md/solid | `success/500` | `--color-success-500` | `neutral/0` | `--color-neutral-0` | Pass |
| success md/soft | `success/50` | `--color-success-50` | `success/700` | `--color-success-700` | Pass |
| warning sm/solid | `warning/500` | `--color-warning-500` | `neutral/900` | `--color-neutral-900` | Pass |
| warning sm/soft | `warning/50` | `--color-warning-50` | `warning/700` | `--color-warning-700` | Pass |
| warning md/solid | `warning/500` | `--color-warning-500` | `neutral/900` | `--color-neutral-900` | Pass |
| warning md/soft | `warning/50` | `--color-warning-50` | `warning/700` | `--color-warning-700` | Pass |
| danger sm/solid | `danger/500` | `--color-danger-500` | `neutral/0` | `--color-neutral-0` | Pass |
| danger sm/soft | `danger/50` | `--color-danger-50` | `danger/700` | `--color-danger-700` | Pass |
| danger md/solid | `danger/500` | `--color-danger-500` | `neutral/0` | `--color-neutral-0` | Pass |
| danger md/soft | `danger/50` | `--color-danger-50` | `danger/700` | `--color-danger-700` | Pass |
| neutral sm/solid | `neutral/500` | `--color-neutral-500` | `neutral/0` | `--color-neutral-0` | Pass |
| neutral sm/soft | `neutral/100` | `--color-neutral-100` | `neutral/700` | `--color-neutral-700` | Pass |
| neutral md/solid | `neutral/500` | `--color-neutral-500` | `neutral/0` | `--color-neutral-0` | Pass |
| neutral md/soft | `neutral/100` | `--color-neutral-100` | `neutral/700` | `--color-neutral-700` | Pass |

**컬러 매핑: 24/24 모두 Pass.**

| 비-컬러 항목 | Figma | 코드 | 판정 | 위치 |
|---|---|---|---|---|
| Padding sm | `p-[space/xs]` (4px) | `p-[var(--space-xs)]` | Pass | `Badge.tsx:60` |
| Padding md | `px-[space/sm] py-[space/xs]` (8/4) | `px-[var(--space-sm)] py-[var(--space-xs)]` | Pass | `Badge.tsx:61` |
| Font size sm | `font-size/xs` (12) | `text-[length:var(--font-size-xs)]` | Pass | `Badge.tsx:65` |
| Font size md | `font-size/sm` (14) | `text-[length:var(--font-size-sm)]` | Pass | `Badge.tsx:66` |
| Radius | `radius/full` (9999) | `rounded-[var(--radius-full)]` | Pass | `Badge.tsx:81` |
| Font family | `Inter` (Figma) → 디자인시스템상 `Pretendard` 치환 | **미지정** (Tailwind 기본 상속) | **Warn** | `Badge.tsx:81` |
| Line height | `leading-[normal]` (~1.2) | `leading-none` (1.0) | **Warn** | `Badge.tsx:81` |

**V-1 (Warn)** — `leading-none`은 디센더(g/p/y/q) 베이스라인 아래 영역이 0 → md(14px) Semi Bold에서 한글/영문 잘림 위험. Figma는 `normal` (Inter 기준 ~1.2). 수정 권장: `leading-[var(--line-height-tight)]` (1.2).

**Font family Warn** — 토큰 정책: 시스템 폰트는 `--font-sans`(Pretendard)로 통일. 코드는 family 지정 없음 → 부모/브라우저 기본 상속. Storybook root에 `font-sans`가 걸려있을 가능성이 있어 실측 필요. 명시적으로 지정 권장.

### 2.2 토큰 사용 정합성

| 항목 | 상태 | 비고 |
|---|---|---|
| 컬러 (12 변수 슬롯) | Pass | 모두 `--color-*` semantic |
| 스페이싱 | Pass | `--space-xs`, `--space-sm` |
| 라디우스 | Pass | `--radius-full` |
| 폰트 사이즈 | Pass | `--font-size-xs`, `--font-size-sm` |
| **폰트 weight** | **Fail (T-1)** | `font-semibold` Tailwind 유틸 직접 사용. `typography.css`에 weight 토큰은 normal/medium/bold만 존재 → SemiBold(600) 토큰 자체가 없음 |
| Font family | Warn | 미지정 (위 참조) |
| 인라인 스타일 | Pass | 컴포넌트 본체엔 없음. Stories에 `width`, `gap` 등 `var(--space-*)` 사용 |

**T-1 (Critical) 상세**:

코드 `Badge.tsx:81`:
```ts
const base = "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-semibold leading-none";
```
- `font-semibold` (Tailwind preset = 600)은 토큰 우회.
- `typography.css`에 600 토큰 없음 (`normal:400 / medium:500 / bold:700`만 존재).
- Figma 시안은 `Inter SemiBold` (600). 즉 디자인 의도는 600이지만, 우리 토큰 체계에선 표현 불가능 상태.

선택지:
1. **권장**: `typography.css`에 `--font-weight-semibold: 600` 추가 → `font-[var(--font-weight-semibold)]` 사용 (토큰 파일 수정은 본 컴포넌트 QA 범위 밖이라 별도 작업 필요)
2. 임시: 시스템 차원 결정 전까지 `font-bold`(700)로 통일 — 시각 차이 미세

### 2.3 접근성

| ID | 항목 | 상태 | 위치 |
|---|---|---|---|
| A-1 | semantic role/aria 가이드 | **Fail** | `Badge.tsx:94` |
| A-2 | 텍스트 contrast (light) | Pass | 토큰 검증 시 AA 충족 |
| A-3 | 텍스트 contrast (dark) | **Warn** | 다크모드 검증 미실측 (2.4 참조) |
| A-4 | warning solid의 `neutral-900` 검정 텍스트 다크모드 | **Warn** | `Badge.tsx:45` (다크모드 시 neutral-900이 `#FAFAFA`로 반전 → amber 위 흰 텍스트가 됨, 의도된 동작이지만 contrast 재검증 필요) |
| A-5 | focus 처리 | Pass (해당 없음 — non-interactive) | — |

**A-1 (High) 상세**:

`<Badge>3</Badge>` 처럼 숫자만 들어가는 알림 카운트 시 SR이 "3"만 읽음 → 의미 불명. 시드 라이업의 RealWorldExamples 4번째 케이스("3 — 읽지 않은 알림")가 이미 이 위험을 노출.

**권장 패턴 (코드 수정 없이 가이드로 처리 가능)**:
```tsx
<Badge variant="danger" aria-label="3 unread notifications">3</Badge>
```

추가 강화 옵션 (선택):
- props로 `role="status"` 또는 `as` polymorphic 지원
- Storybook 스토리에 aria-label 사용 예시 추가 (현재 `RealWorldExamples`에 없음)

**A-4 다크모드 contrast 우려 케이스**:

| 조합 | Light | Dark | 우려 |
|---|---|---|---|
| warning solid | `#F59E0B` BG + `#171717` text | `#F59E0B` BG + `#FAFAFA` text | dark에서 흰 텍스트가 amber-500 위 → contrast ratio ≈ 2.0 (AA fail) |
| neutral soft | `#F5F5F5` BG + `#404040` text | `#262626` BG + `#E5E5E5` text | dark contrast OK |
| default solid | `#262626` BG + `#FFF` text | `#F5F5F5` BG + `#0A0A0A` text | dark contrast OK (반전) |
| primary soft | `#FFF7ED` BG + `#C2410C` text | `#FFF7ED` BG + `#C2410C` text | dark에서 BG/text 동일 유지 (brand는 모드 무관). 다크 배경 위 밝은 박스 → 시각적 부조화 |

**warning solid 다크모드는 사실상 사용 불가** — semantic 차원에서 text-on-warning 토큰 분리가 필요하지만, 본 QA는 컴포넌트 범위만 다룸 → 일단 Warn.

### 2.4 다크모드

| ID | 항목 | 상태 |
|---|---|---|
| D-1 | neutral 기반 자동 반전 | Pass |
| D-2 | brand 모드 무관 유지 | Pass |
| D-3 | success/danger 50/700 다크에서 가독성 | Pass (50은 어두운 배경 위 밝은 박스로 명확, 700 text contrast 검증됨) |
| D-4 | warning solid (text=neutral-900) | **Warn** (A-4 참조) |
| D-5 | Storybook DarkMode 스토리 실효성 | **Warn** |

**D-5 상세**: `Badge.stories.tsx:132-144`의 `DarkMode` 스토리는 `colorScheme: "dark"` + `backgrounds.values: var(--color-neutral-900)` 사용. 하지만 우리 토큰은 `prefers-color-scheme: dark` 미디어쿼리 기반 → Storybook decorator만으론 토큰 반전이 트리거되지 않을 가능성 높음. TextField QA에서도 동일 패턴이 통과 처리됐는데, 실측 검증이 미수행이라 동일하게 Warn으로 표시.

**검증 방법**: OS 다크모드로 전환하고 Storybook 새로고침 → DarkMode 스토리뿐 아니라 모든 스토리가 다크 토큰을 받는지 확인. 또는 `darkMode` storybook addon 도입 검토.

### 2.5 TextField와 일관성

| ID | 항목 | TextField | Badge | 판정 |
|---|---|---|---|---|
| C-1 | 파일 경로 | `src/components/ui/TextField.tsx` | `src/components/Badge/Badge.tsx` | **Fail** |
| C-2 | forwardRef + displayName | `forwardRef` + 함수명만 | `forwardRef` + `displayName = "Badge"` | Pass (Badge가 더 명시적) |
| C-3 | export 패턴 | `export const TextField = forwardRef(...)` | 동일 + 별도 `index.ts` 배럴 | Pass |
| C-4 | className 병합 | `template literal + 조건부` | `배열 + filter + join` | Pass (둘 다 안전) |
| C-5 | 토큰 사용 (CSS variable) | 100% (CSS modules) | 95% (font-weight만 Tailwind 직접) | Warn (T-1 중복) |
| C-6 | 스타일링 방식 | `.css` 별도 파일 | Tailwind arbitrary value 인라인 | (의도된 차이, 판정 보류) |

**C-1 (High) 상세**:

```
src/components/
├── ui/                     ← TextField 시드 (시드 1)
│   ├── TextField.tsx
│   ├── TextField.css
│   └── TextField.stories.tsx
└── Badge/                  ← Badge 시드 (시드 2)
    ├── Badge.tsx
    ├── index.ts
    └── Badge.stories.tsx
```

두 패턴이 공존 — 시드 3번째 컴포넌트 추가 시 어디로 갈지 결정 부재. 또한 `index.ts` 배럴이 Badge에만 존재 → import 경로 일관성 깨짐:
- `import { TextField } from "@/components/ui/TextField"` (직접)
- `import { Badge } from "@/components/Badge"` (배럴 경유)

**권장**: 하나로 통일. 토스 스타일이면 `src/components/{Name}/{Name}.tsx + index.ts` 패턴이 더 일반적 → TextField를 `ui/` → `TextField/`로 이동 검토.

### 2.6 Storybook 커버리지

| 스토리 | 상태 |
|---|---|
| Default, Primary, Success, Warning, Danger, Neutral, Soft | Pass |
| SizeMatrix, VariantMatrix, FullMatrix (24 grid) | Pass |
| RealWorldExamples (NEW/Verified/Beta/알림카운트/Sold out) | Pass |
| DarkMode | Warn (D-5 — 실효성 의심) |
| **aria-label 사용 예시** (숫자 Badge) | **Warn — 누락** (A-1 연계) |
| 긴 텍스트 / overflow | 누락 (rounded-full에서 잘림/말줄임 정책 미정) |
| icon + text 조합 | 누락 (현재 props상 children만 받음, 향후 확장 예정 여부 명시 필요) |

권장 추가 스토리:
```tsx
export const WithAriaLabel: Story = {
  render: () => (
    <button aria-label="알림 3개">
      Inbox <Badge variant="danger" aria-label="3 unread">3</Badge>
    </button>
  ),
};

export const LongText: Story = {
  args: { variant: "neutral", style: "soft", children: "Very long badge label that might wrap" },
};
```

---

## 3. 권장 수정 사항 (코드)

### 우선순위 1 — Critical/High

**1. font-weight 토큰화 (T-1)** — `Badge.tsx:81`

토큰 추가 없이 임시 정렬:
```diff
- const base = "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-semibold leading-none";
+ const base = "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-bold leading-[var(--line-height-tight)]";
```
또는 토큰 추가 후 (`typography.css`에 `--font-weight-semibold: 600` 선언 필요 — 별도 PR):
```ts
const base = "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-[var(--font-weight-semibold)] leading-[var(--line-height-tight)] font-sans";
```

**2. leading 수정 (V-1)** — 위 1번에 포함

**3. aria-label 지원 검증 (A-1)** — 추가 코드 불필요 (`HTMLAttributes<HTMLSpanElement>` 통해 이미 전달 가능). 단 README/Stories에 사용 예시 명시:

```tsx
// Badge.stories.tsx에 추가
export const AccessibleCount: Story = {
  args: { variant: "danger", "aria-label": "3 unread notifications", children: "3" },
};
```

**4. 디렉터리 일관성 (C-1)** — TextField를 `src/components/TextField/`로 이동하거나 Badge를 `src/components/ui/`로 이동. 본 QA 범위 밖, 별도 결정 필요.

### 우선순위 2 — Warn

**5. font-family 명시** — `Badge.tsx:81`
```diff
- const base = "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] ...";
+ const base = "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-full)] font-sans ...";
```

**6. warning solid 다크모드 토큰 분리** — 본 컴포넌트 외부 작업. semantic 레이어에 `--color-text-on-warning` 도입 → Light=neutral-900, Dark=neutral-0이 아닌 신중한 값(예: 다크에서 warning-900 같은 어두운 톤) 결정 후 적용. 별도 토큰 PR 필요.

**7. Storybook DarkMode 검증** — `storybook-dark-mode` addon 또는 `withThemeByClassName` 도입 검토. 본 컴포넌트 외부 인프라 작업.

---

## 4. Figma vs 코드 비교

- **Figma 원본 스크린샷** (component set 96:50): `https://www.figma.com/api/mcp/asset/4d1f2296-c0c6-4264-980a-8e0f5bb6f55d` (7일 만료)
- **코드 결과**: `pnpm storybook` → `UI/Badge/FullMatrix` (24조합 그리드)

수동 비교 체크리스트:
- [ ] FullMatrix 24셀 모두 Figma 24셀과 BG/text 컬러 일치
- [ ] sm vs md 패딩 차이 정확 (sm은 정사각형에 가까운 dot 형태, md는 가로로 길쭉)
- [ ] warning solid의 검정 텍스트가 amber 위에서 잘 보이는가
- [ ] `leading-none` 적용 후 디센더 잘림 여부 (md size에서 "ping"/"가능" 같은 라벨로 시험)
- [ ] OS 다크모드 전환 시 모든 24셀이 의도대로 반전되는가

---

## 5. 픽스 우선순위 (다음 단계 즉시 적용용)

| # | 작업 | 파일 | 영향도 | 토큰 수정 필요 |
|---|---|---|---|---|
| 1 | `font-semibold` → `font-bold` + `leading-none` → `leading-[var(--line-height-tight)]` + `font-sans` 추가 | `src/components/Badge/Badge.tsx:81` | High (시각 + 토큰 준수) | 없음 (임시안) |
| 2 | `AccessibleCount` 스토리 추가 (aria-label 가이드) | `src/components/Badge/Badge.stories.tsx` | High (DX/A11y 가이드) | 없음 |
| 3 | `LongText` 스토리 추가 (overflow 정책 결정 트리거) | `src/components/Badge/Badge.stories.tsx` | Medium | 없음 |
| 4 | `--font-weight-semibold: 600` 토큰 도입 후 #1을 `font-[var(--font-weight-semibold)]`로 재정정 | `src/tokens/typography.css` | High (시스템) | **필요** (별도 PR — `figma-token-builder` 위임) |
| 5 | TextField 위치를 `src/components/ui/` → `src/components/TextField/`로 이동 (또는 반대) + barrel 통일 | 파일 이동 | High (구조) | 없음 |
| 6 | warning solid 다크모드 — `--color-text-on-warning` semantic 토큰 도입 + Badge가 이를 참조하도록 변경 | `src/tokens/colors.css` + `Badge.tsx:45` | Medium (다크모드 한정) | **필요** |
| 7 | Storybook dark mode addon 도입 또는 `prefers-color-scheme` 강제 트리거 데코레이터 | `.storybook/preview.ts` | Medium (검증 인프라) | 없음 |

**결론**: 컬러 토큰 매핑 24/24 완벽, 패딩/라디우스/폰트사이즈 일치. 핵심 결함 3건만 처리하면 Critical 0, High 0 달성:
1. `font-semibold` + `leading-none` 토큰 우회 → 한 줄 수정
2. aria-label 사용 패턴 스토리 추가
3. 디렉터리 일관성 결정 (TextField/Badge 패턴 통일)
