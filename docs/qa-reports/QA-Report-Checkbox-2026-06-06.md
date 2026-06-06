# QA Report: Checkbox

- 날짜: 2026-06-06
- 대상: `src/components/Checkbox/` (시드 라인업 #3)
- Figma: `B138LEBl3Li7yNGdSpIuq6` node `110:86` (Component Set, 12 variants)
- 비교 기준: Figma MCP 원본 vs 코드 구현

---

## 1. 요약

| 분류 | 개수 |
|---|---|
| Pass | 11 |
| Fail | 0 |
| Warning | 5 |
| Critical | 0 |
| High | 1 |
| Medium | 3 |
| Low | 1 |

**결론**: 토큰 매핑·접근성·다크모드 모두 우수. 단 **focus-visible 시각 피드백 누락**과 **unchecked 라벨 컬러 시안 불일치** 2건이 의미 있는 이슈.

---

## 2. Figma 원본 (MCP 수집값)

### 2.1 Variants (12개)
state(3) × size(2) × disabled(2) = 12. 모두 Component Set에 존재.
- state: `unchecked` / `checked` / `indeterminate`
- size: `sm`(16px box, 10px mark, 14px label) / `md`(20px box, 12px mark, 16px label)
- disabled: `true` / `false`

### 2.2 Variables (Figma get_variable_defs 원본)
```
radius/sm                       = 4
border-width/thin               = 1
semantic/border/strong          = #d4d4d4
semantic/border/default         = #e5e5e5
semantic/text/tertiary          = #737373
semantic/action/text/on-brand   = #ffffff
brand/500                       = #f97316
space/sm                        = 8
opacity/disabled                = 0.4
```

### 2.3 매핑 규칙 (Figma 코드 원본에서 추출)
| 상태 | box border | box bg | mark | label color |
|---|---|---|---|---|
| unchecked, !disabled | `border/strong` | transparent | — | `text/tertiary` |
| unchecked, disabled | `border/default` | transparent | — | `text/tertiary` (+opacity 0.4) |
| checked, !disabled | `brand/500` | `brand/500` | `action/text/on-brand` | `text/tertiary` |
| checked, disabled | `brand/500` | `brand/500` | `action/text/on-brand` | `text/tertiary` (+opacity 0.4) |
| indeterminate, * | checked과 동일 | checked과 동일 | bar `action/text/on-brand` | 동일 |

> 주의: Figma 시안의 라벨 컬러는 12 variants 전부 `semantic/text/tertiary(#737373)`. 일반적인 토스 패턴(`text/primary` = neutral-900)과 다른 디자인 결정.

---

## 3. 항목별 대조표

| # | 항목 | Figma | 코드 (`Checkbox.tsx`) | 판정 |
|---|---|---|---|---|
| 1 | Box size sm | 16px | `BOX_SIZE.sm = "size-[16px]"` (L14) | Pass (예외 허용) |
| 2 | Box size md | 20px | `BOX_SIZE.md = "size-[20px]"` (L15) | Pass (예외 허용) |
| 3 | Mark size sm | 10px | `MARK_SIZE.sm = "size-[10px]"` (L19) | Pass (예외 허용) |
| 4 | Mark size md | 12px | `MARK_SIZE.md = "size-[12px]"` (L20) | Pass (예외 허용) |
| 5 | Border width | 1px | `var(--border-width-thin)` (L83) | Pass |
| 6 | Corner radius | 4px | `var(--radius-sm)` (L82) | Pass |
| 7 | Box border (unchecked, enabled) | `border/strong` | `var(--color-border-strong)` (L78) | Pass |
| 8 | Box border (unchecked, disabled) | `border/default` | `var(--color-border-default)` (L77) | Pass |
| 9 | Box fill (checked/indeterminate) | `brand/500` | `var(--color-brand-500)` (L75) | Pass |
| 10 | Check/indeterminate stroke·fill | `action/text/on-brand` | `var(--color-action-text-on-brand)` (L144, L168) | Pass |
| 11 | Gap (box ↔ label) | `space/sm` = 8 | `var(--space-sm)` (L65) | Pass |
| 12 | Disabled opacity | 0.4 | `var(--opacity-disabled)` (L67) | Pass |
| 13 | Label font size sm | 14px | `var(--font-size-sm)` (L24) | Pass |
| 14 | Label font size md | 16px | `var(--font-size-base)` (L25) | Pass |
| 15 | Label color (enabled) | `text/tertiary` (#737373) | `text-primary` (L90) | **Warning** |
| 16 | Label color (disabled) | `text/tertiary` | `text-tertiary` (L89) | Pass |
| 17 | Native input semantic | (Figma는 div) | `<label>` + `<input type="checkbox">` sr-only (L93-104) | Pass |
| 18 | aria-checked="mixed" | — | `indeterminate ? "mixed" : undefined` (L102) | Pass |
| 19 | indeterminate DOM property | — | `useEffect`로 input.indeterminate 동기화 (L55-59) | Pass |
| 20 | controlled/uncontrolled 양립 | — | `checked`/`defaultChecked` 둘 다 props 통과 (L99-100) | Pass |
| 21 | forwardRef + displayName | — | `forwardRef` (L36), `displayName = "Checkbox"` (L131) | Pass |
| 22 | export 패턴 | — | `index.ts`에서 named + type export | Pass |
| 23 | Focus visible | — | (없음) | **Warning** |
| 24 | Disabled cursor | — | `cursor-not-allowed` (L67) | Pass |
| 25 | Indeterminate vs checked 우선순위 | — | `isFilled` = indeterminate OR checked (L61) | Pass |
| 26 | 12 variants 시각 재현 | 12개 | 코드 조합으로 12개 전부 표현 가능 | Pass |
| 27 | Tailwind arbitrary value 패턴 (Badge 정합성) | — | Badge와 동일 `var(--token)` 래핑 사용 | Pass |
| 28 | 다크모드 토큰 분기 | — | text/border/brand 모두 semantic 토큰 → 다크모드 자동 적용 | Pass |

---

## 4. 이슈 상세

### [High] H-1. Focus visible 시각 피드백 없음
- 위치: `src/components/Checkbox/Checkbox.tsx:105-108` (visual `<span>`)
- 현상: native input이 `sr-only`라 sighted user가 Tab으로 focus 잡았을 때 visual box에 아무 변화 없음. 키보드 사용자가 현재 위치를 인지할 수 없음.
- 영향: WCAG 2.1 SC 2.4.7 Focus Visible 미준수. 접근성 핵심 이슈.
- 권장 픽스: visual span에 `peer-focus-visible` 링 추가.

```tsx
const boxClass = [
  "relative inline-flex items-center justify-center shrink-0",
  "rounded-[var(--radius-sm)]",
  "border-[length:var(--border-width-thin)] border-solid",
  // 추가
  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
  "peer-focus-visible:outline-[var(--color-brand-500)]",
  BOX_SIZE[size],
  boxBorder,
].join(" ");
```
(input이 `peer` 클래스를 이미 가지고 있으므로 `peer-focus-visible:*` 바로 사용 가능 — L103 확인)

---

### [Medium] M-1. Label 색상이 시안과 다름 (enabled 상태)
- 위치: `Checkbox.tsx:88-90`
- 현상: 코드는 enabled일 때 `--color-text-primary`(neutral-900)를 쓰지만, Figma 시안 12 variants 전부 `semantic/text/tertiary`(#737373).
- 판단:
  - **시안 그대로 따른다면** → `text-primary` → `text-tertiary`로 교체 (Fail로 격상).
  - **의도적 개선이라면** → 시안이 실수일 가능성이 높음(라벨이 너무 흐림). 디자이너 확인 필요.
- 권장: 디자이너에게 “체크박스 라벨 enabled 컬러를 text-primary로 올렸는데 시안 업데이트 가능?” 한 줄로 확인 후 결정. 본 리포트는 Warning(Medium)으로 유지.

```tsx
// 시안 따를 경우
const labelColor = "text-[var(--color-text-tertiary)]";
```

---

### [Medium] M-2. Disabled 시 input은 클릭 가능 상태로 남음
- 위치: `Checkbox.tsx:66-68, 101`
- 현상: `disabled=true`면 `<input disabled>`가 잘 걸리지만, 루트 `<label>`의 `cursor-not-allowed`는 시각적 보조일 뿐. 실제 input은 disabled로 무력화되므로 동작에는 문제 없음. **다만** `opacity-[var(--opacity-disabled)]`만 적용되어 hover 시 visual box border 등에 시각 변화는 없음 — Figma도 동일하므로 동작상 Pass, **테스트 시 키보드 Tab으로 disabled 항목이 skip되는지** 검증 권장.
- 검증 액션: Storybook에서 Tab 키로 disabled 항목 건너뛰는지 직접 확인.

---

### [Medium] M-3. useEffect 의존성에 불필요한 `checked` 포함
- 위치: `Checkbox.tsx:59`
- 현상: `useEffect(..., [indeterminate, checked])` — `checked`가 바뀔 때마다 동기화되지만, 본문은 `indeterminate`만 쓴다. 큰 문제는 아니나, controlled 폼에서 매 onChange마다 effect가 재실행됨.
- 권장 픽스: `[indeterminate]`만 남기고 `checked` 제거 (또는 의도가 “checked 후 indeterminate 자동 해제”라면 코멘트 추가).

```tsx
useEffect(() => {
  if (innerRef.current) {
    innerRef.current.indeterminate = indeterminate;
  }
}, [indeterminate]);
```

---

### [Low] L-1. Storybook `DarkMode` 스토리에 `data-theme="dark"` 누락
- 위치: `Checkbox.stories.tsx:166-172`
- 현상: 배경만 dark로 깔고 `colorScheme: dark`만 적용. 프로젝트의 다크모드 토큰이 `[data-theme="dark"]` 셀렉터 기반이라면 토큰이 다크모드로 전환되지 않음.
- 권장 픽스: decorator의 wrapper div에 `data-theme="dark"` 추가.

```tsx
decorators: [
  (Story) => (
    <div data-theme="dark" style={{ colorScheme: "dark", padding: "var(--space-lg)" }}>
      <Story />
    </div>
  ),
],
```

> 검증 필요: `src/tokens/colors.css`의 다크 토큰이 `[data-theme="dark"]` 셀렉터인지 `@media (prefers-color-scheme: dark)`인지 확인하고 일치시키기.

---

## 5. 접근성 체크리스트

| 항목 | 상태 |
|---|---|
| native `<input type="checkbox">` 사용 | Pass |
| `<label htmlFor>` 연결 | Pass (L93) |
| Space 키 토글 | Pass (native 동작 유지) |
| Tab focus | Pass (sr-only는 focusable) |
| `aria-checked="mixed"` (indeterminate) | Pass |
| `indeterminate` DOM property 동기화 | Pass |
| Disabled 시 input.disabled 적용 | Pass |
| **Focus visible 시각 표시** | **Fail (H-1)** |
| 마크 아이콘 `aria-hidden` | Pass |
| 라벨 텍스트로 입력 가능한 영역 명확 | Pass |

---

## 6. 다크모드 12 조합 검증

12 variants 모두 다음 semantic 토큰 위에 구성됨:
- `--color-border-strong`, `--color-border-default` → 다크 토큰 존재 확인 (`colors.css:102-103`이 `neutral-*` 참조 → 다크 분기 적용됨)
- `--color-brand-500` → 라이트/다크 동일 (의도)
- `--color-action-text-on-brand` → 라이트/다크 동일 흰색 (의도, `colors.css:87` 주석)
- `--color-text-primary`, `--color-text-tertiary` → semantic, 다크 분기 적용

**결론**: 토큰 레이어는 다크모드 완전 대응. 단 L-1 픽스 후 Storybook에서 실제 시각 검증 필요.

---

## 7. 일관성 (Badge/TextField 패턴과 비교)

| 항목 | Badge 패턴 | Checkbox | 일치 |
|---|---|---|---|
| 디렉터리 | `src/components/Badge/` | `src/components/Checkbox/` | Pass |
| `index.ts` re-export | named + type | named + type | Pass |
| `forwardRef` | O | O | Pass |
| `displayName` | O | O | Pass |
| Tailwind arbitrary `var(--token)` | O | O | Pass |
| Storybook `tags: ["autodocs"]` | O | O | Pass |
| State matrix 스토리 | O | O | Pass |

---

## 8. 픽스 우선순위

| 우선순위 | 이슈 | 액션 |
|---|---|---|
| 1 (즉시) | **H-1** Focus visible 누락 | `peer-focus-visible:outline` 추가 (5분) |
| 2 | **M-1** Label enabled 컬러 시안 불일치 | 디자이너 한 줄 확인 후 코드 또는 시안 정렬 |
| 3 | **M-3** useEffect 의존성 정리 | `[indeterminate]`만 남기기 |
| 4 | **L-1** Storybook DarkMode `data-theme` | decorator wrapper에 속성 추가 |
| 5 (검증) | **M-2** Disabled Tab skip | Storybook 키보드 테스트로 확인만 |

---

## 9. Figma vs 코드 스크린샷

- Figma 원본 PNG: `https://www.figma.com/api/mcp/asset/60adb4de-6ace-4528-ae2e-93f1edc5bdd0` (118×446, 7일 만료)
- 코드 스크린샷: Storybook `UI/Checkbox` → `StateMatrix` 비교 권장.
- 마크 형태(체크 path / indeterminate bar), 박스 사이즈, 컬러, 라벨 사이즈 모두 시안과 일치 (라벨 컬러만 M-1 이슈).
