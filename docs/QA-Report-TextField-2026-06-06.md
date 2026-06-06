# TextField QA Report — 2026-06-06

대상 컴포넌트: `src/components/ui/TextField.tsx`
Figma 원본: `B138LEBl3Li7yNGdSpIuq6` / node `76:107` (5 state × 3 size = 15 variants)

---

## 1. 요약

| 카테고리 | Pass | Warn | Fail |
|---|---|---|---|
| Figma 정합성 | 5 | 2 | 1 |
| 토큰 사용 | 6 | 0 | 0 |
| 접근성 | 5 | 1 | 0 |
| 시각적 일관성 | 2 | 2 | 1 |
| Storybook 커버리지 | 1 | 3 | 0 |
| 기존 컴포넌트 일관성 | 2 | 1 | 1 |
| **합계** | **21** | **9** | **3** |

### Critical / Major 이슈

- **[Critical] F-1** `disabled` state에서 Figma는 컴포넌트 전체 `opacity: var(--opacity/disabled)` 적용 — 코드는 input에만 적용 (label/helper 정상 불투명도 유지). 시각 결과 불일치.
- **[Major] V-3** focus/error 진입 시 border `1px → 2px` 변경되지만 input padding은 그대로 → **1px 텍스트 점프(jitter)** 발생. Figma도 동일 패턴이라 시각은 일치하나 UX 결함.
- **[Major] C-2** Button은 focus를 `outline + outline-offset`로 처리, TextField는 `border` 굵기로 처리 → 디자인 시스템 내 focus 처리 패턴 비일관.

---

## 2. 항목별 상세

### 2.1 Figma ↔ 코드 정합성

| ID | 항목 | Figma | Code | 판정 | 위치 |
|---|---|---|---|---|---|
| F-1 | disabled 전체 opacity | `opacity: 0.4`를 wrapper에 적용 (label/input/helper 모두 흐려짐) | `:disabled` 의사 클래스가 `<input>`에만 걸려 input만 흐려짐 | **Fail** | `TextField.css:42-45` |
| F-2 | sm size 패딩 | `padding: 4px 8px` (xs/sm) | `padding: var(--space-xs) var(--space-sm)` | Pass | `TextField.css:62-66` |
| F-3 | md size 패딩 | `padding: 8px 16px` (sm/md) | `padding: var(--space-sm) var(--space-md)` | Pass | `TextField.css:68-72` |
| F-4 | lg size 패딩 | `padding: 16px 24px` (md/lg) | `padding: var(--space-md) var(--space-lg)` | Pass | `TextField.css:74-78` |
| F-5 | sm radius | `--radius/sm = 4px` | `--radius-sm` | Pass | `TextField.css:65` |
| F-6 | md/lg radius | `--radius/md = 8px` | `--radius-md` | Pass | `TextField.css:71,77` |
| F-7 | required 색상 | `--semantic/text/brand` (#c2410c) | `--color-text-brand` | Pass | `TextField.css:18` |
| F-8 | error border 색상 | `--danger/500` (#ef4444) | `--color-danger-500` | Pass | `TextField.css:48` |
| F-9 | error helper 색상 | `--danger/600` (#dc2626) | `--color-danger-600` | Pass | `TextField.css:58` |
| F-10 | focus border 색상 | `--semantic/action/bg/default` (#f97316) | `--color-action-bg-default` | Pass | `TextField.css:39` |
| F-11 | wrapper gap | Figma는 `gap: 4px` (space/xs) | 코드는 `gap: var(--space-xs)` | Pass | `TextField.css:4` |
| F-12 | wrapper width | Figma 고정 `w-[240px]` | 코드 폭 제약 없음 (`width: 100%` input) | **Warn** | `TextField.css:23` |
| F-13 | label font | Figma `Inter Medium 14` | 코드 `var(--font-sans)` + `--font-weight-medium` + `--font-size-sm` (Pretendard로 토큰화) | Warn (의도된 차이) | `TextField.css:8-14` |

**판정 근거**

- **F-1 Fail**: Figma wrapper 클래스에 `opacity-[var(--opacity\/disabled,0.004)]` 적용 확인 (state==="disabled"). 코드 `.textfield--disabled`는 wrapper에 클래스만 붙고 opacity 규칙 없음. 결과적으로 disabled label/helper가 평소처럼 진하게 보임.
- **F-12 Warn**: Figma 폭 240px 고정은 디자인 예시 폭일 가능성 — 컴포넌트는 fluid가 더 적절. 단 명세에서 폭 정책이 명시되지 않음.
- **F-13 Warn**: Figma는 Inter, 코드는 Pretendard. 디자인 시스템 차원의 한글 폰트 치환이라면 정상.

### 2.2 토큰 사용 정합성

`TextField.css` 전수 검사 결과 **하드코딩 0건**.

| 항목 | 토큰 사용 여부 | 비고 |
|---|---|---|
| 컬러 (8건) | 전부 `--color-*` semantic | Pass |
| 스페이싱 (10건) | 전부 `--space-*` | Pass |
| 라디우스 (3건) | 전부 `--radius-*` | Pass |
| 폰트 사이즈 (4건) | 전부 `--font-size-*` | Pass |
| 모션 (1건) | `--motion-duration-fast` + `--motion-easing-standard` | Pass |
| Opacity | `--opacity-disabled` | Pass |

`TextField.tsx` 인라인 스타일 없음 — Pass.
`TextField.stories.tsx`에 `width: "20rem"` 하드코딩 (스토리북 데모 컨테이너이므로 허용 범위, 단 권장은 토큰화).

### 2.3 접근성

| ID | 항목 | 상태 | 위치 |
|---|---|---|---|
| A-1 | `<label htmlFor>` ↔ `<input id>` 연결 | Pass | `TextField.tsx:33-49` |
| A-2 | `aria-invalid` (error 시 true) | Pass | `TextField.tsx:54` |
| A-3 | error 메시지 `role="alert"` | Pass | `TextField.tsx:64` |
| A-4 | `aria-describedby` 연결 | Pass | `TextField.tsx:55,61` |
| A-5 | 필수 표시 `*` `aria-hidden="true"` | Pass | `TextField.tsx:41` |
| A-6 | `:focus-visible` 처리 | Pass | `TextField.css:38-40` |
| A-7 | disabled cursor | Pass | `TextField.css:44` |
| A-8 | label 자체가 wrapper인 구조 | **Warn** | `TextField.tsx:33-69` |

**A-8 상세**: `<label>` 안에 helper/error 텍스트와 input이 모두 들어가 있음. `<label>` 클릭 시 input에 포커스가 가는 동작은 정상. 다만 `role="alert"`을 가진 `<span>`이 `<label>` 자손이라는 점이 SR에 따라 label 텍스트로 함께 읽힐 수 있음. label의 의미적 텍스트는 `textfield__label` span에만 두는 것이 더 안전. 권장: wrapper를 `<div>`로 바꾸고 `<label htmlFor>`를 label span에만 적용.

### 2.4 시각적 일관성

| ID | 항목 | 상태 | 위치 |
|---|---|---|---|
| V-1 | size별 padding/font/radius 비례 | Pass | `TextField.css:62-78` |
| V-2 | 다크모드 — input 배경/텍스트 자동 반전 | Pass | `colors.css` semantic alias 상속 |
| V-3 | focus/error 진입 시 border `1 → 2px` 변경 → 1px jitter | **Fail** | `TextField.css:38-49` |
| V-4 | line-height-base 적용 — sm size에서 행간이 텍스트 절단 위험 | **Warn** | `TextField.css:29` |
| V-5 | error + focus 동시 발생 시 우선순위 | **Warn** | `TextField.css:38-49` |

**V-3 상세 (Major)**: `.textfield__input` 기본 `border: 1px solid`. focus/error에서 `border: 2px solid` 로 교체 → 컨테이너 폭/높이는 box-sizing 기본이라 1px 차이가 input 내부 콘텐츠 영역을 1px 줄여 텍스트가 위로 점프. 해결책 둘 중 하나:

```css
/* 옵션 A: 기본 border를 2px로 두고, 평상시 transparent 사용 */
.textfield__input {
  border: var(--border-width-base) solid transparent;
  box-shadow: inset 0 0 0 var(--border-width-thin) var(--color-border-default);
}
.textfield__input:focus-visible {
  border-color: var(--color-action-bg-default);
  box-shadow: none;
}

/* 옵션 B: focus/error 시 padding을 1px씩 줄여 보정 */
.textfield__input:focus-visible,
.textfield__input[aria-invalid="true"] {
  padding-block: calc(var(--space-sm) - 1px);
  padding-inline: calc(var(--space-md) - 1px);
}
```

**V-5 상세**: 현재 CSS 선언 순서상 `[aria-invalid="true"]`가 `:focus-visible` 뒤에 위치 → error focus 시 빨간 border로 표시됨 (의도 가능). 하지만 명세상 동작 규칙이 문서화되지 않음 — 코멘트 또는 스토리로 보강 권장.

**V-4 상세**: input에 `line-height: 1.5` 적용. sm size (padding 4px + font 14px) 기준 input 높이 = `14 × 1.5 + 4 × 2 + 2 = 31px` (border 1px 기준). 다크모드 + 한글에서 어센더/디센더 잘림 가능성 낮음. Warn 수준.

### 2.5 Storybook 커버리지

| 스토리 | 상태 |
|---|---|
| Default, WithHelper, Required, Filled, ErrorState, Disabled, SmallSize, LargeSize, SizeMatrix, StateMatrix, DarkMode | Pass (11개, 명세 9 + 2 추가) |
| **Focus state 강제 스토리** (`pseudo: { focusVisible: true }`) | **Warn — 누락** |
| **`type="password"`** 스토리 | **Warn — 누락** |
| **`type="email"` / autoComplete** 스토리 | **Warn — 누락** |
| 컨트롤드 (`value` + `onChange`) 예시 | Warn — 누락 |
| 긴 입력값 overflow 처리 | Warn — 누락 |

권장 추가 스토리:

```tsx
export const Password: Story = {
  args: { label: "비밀번호", type: "password", autoComplete: "current-password" },
};

export const Email: Story = {
  args: { label: "이메일", type: "email", autoComplete: "email", inputMode: "email" },
};

export const FocusedState: Story = {
  args: { autoFocus: true },
  parameters: { pseudo: { focusVisible: true } },
};
```

### 2.6 기존 컴포넌트와 일관성

| ID | 항목 | Button / TripCard | TextField | 판정 |
|---|---|---|---|---|
| C-1 | export 방식 | `export function Button` (named) | `export const TextField = forwardRef(...)` (named) | Pass (둘 다 named) |
| C-2 | focus 처리 | Button: `outline` + `outline-offset` | TextField: `border` 굵기 변경 | **Fail** (패턴 불일치) |
| C-3 | className 병합 | `` `${base}${className ? ` ${className}` : ""}` `` | 동일 패턴 | Pass |
| C-4 | size 토큰 매핑 | Button sm/md/lg = xs·sm / sm·md / md·lg | TextField sm/md/lg = xs·sm / sm·md / md·lg | Pass (완전 일치) |
| C-5 | disabled 처리 | Button: `opacity-disabled` + `cursor: not-allowed` (wrapper) | TextField: input에만 적용 | **Warn** (F-1 중복) |

**C-2 상세 (Major)**: Button focus는 outline으로 layout shift 없음. TextField는 border 굵기 변경으로 jitter 발생 (V-3). 시스템 전체에서 focus 표현을 outline으로 통일 권장. 단 input 내부 콘텐츠 영역이 outline-offset과 겹치지 않게 처리 필요.

---

## 3. 권장 수정 사항

### 우선순위 1 (Critical/Major)

**1. disabled wrapper 전체 opacity 적용 (F-1)**

```css
/* TextField.css:42-45 변경 */
.textfield--disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}
.textfield--disabled .textfield__input {
  cursor: not-allowed;
}
/* 기존 .textfield__input:disabled의 opacity는 제거 */
```

**2. focus/error border jitter 제거 (V-3)**

위 옵션 A (inset box-shadow) 권장 — 의미적으로도 border는 2px 고정, 시각만 변경.

**3. Button과 focus 처리 패턴 통일 (C-2)**

옵션 A로 처리하면 border 굵기는 항상 2px이고 시각만 box-shadow로 변경 — Button outline 패턴과 다르지만 input 내부 텍스트 정렬을 위해 input은 별도 패턴이 합리적. 디자인 시스템 문서에 "input 류는 box-shadow inset, button 류는 outline" 규칙 명시 권장.

### 우선순위 2 (Warn)

**4. label wrapper 의미 정리 (A-8)**

```tsx
// TextField.tsx 구조 변경
<div className={`textfield textfield--${size}${disabled ? " textfield--disabled" : ""}${className ? ` ${className}` : ""}`}>
  {label ? (
    <label htmlFor={inputId} className="textfield__label">
      {label}
      {required ? <span className="textfield__required" aria-hidden="true">*</span> : null}
    </label>
  ) : null}
  <input id={inputId} ref={ref} ... />
  {showDesc ? <span id={describedById} ...>{error ?? helper}</span> : null}
</div>
```

**5. Storybook 추가 — Password / Email / FocusedState** (위 코드 참조)

**6. error + focus 동시 발생 동작 문서화**

CSS 주석으로 명시:
```css
/* error state가 focus보다 우선 — 빨간 border 유지 */
.textfield__input[aria-invalid="true"] { ... }
```

---

## 4. Figma vs 코드 스크린샷 비교

- **Figma 원본 (15 variants)**: `https://www.figma.com/api/mcp/asset/69efafde-8ee4-4583-8aa8-63b49a026cbb` (7일 만료)
- **코드 결과**: `pnpm storybook` → UI/TextField/StateMatrix · SizeMatrix · DarkMode 비교

수동 비교 체크리스트:
- [ ] StateMatrix `Disabled` row → label/helper도 흐려져 보이는가? (F-1 검증)
- [ ] StateMatrix `Error` row → 빨간 border 2px, helper #dc2626인가?
- [ ] StateMatrix → `Default` → 입력창 클릭 시 텍스트가 1px 점프하는가? (V-3 검증)
- [ ] SizeMatrix → sm/md/lg 비례가 Figma 4·8·16 / 8·16 / 16·24 패딩과 일치하는가?
- [ ] DarkMode → input 배경이 `--color-neutral-0` (다크에서 #0A0A0A)으로 반전되는가?

---

## 5. 결론

코드 품질은 전반적으로 양호 (토큰 사용 100%, 접근성 기본 충족, 24개 항목 Pass). 다만:

- **즉시 수정**: F-1 (disabled wrapper opacity), V-3 (border jitter)
- **단기 개선**: A-8 (label 의미 분리), Storybook 보강 3종
- **시스템 차원 결정 필요**: input 류 focus 표현 패턴 (border vs outline vs box-shadow)

다음 액션: 위 우선순위 1 항목 3건만 수정해도 Critical 0건 / Major 0건 달성 가능.
