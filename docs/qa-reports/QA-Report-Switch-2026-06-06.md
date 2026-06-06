# QA Report — Switch

- 날짜: 2026-06-06
- 범위: `src/components/Switch/{Switch.tsx,index.ts,Switch.stories.tsx}`
- Figma: Component Set `128:66`, Documentation `130:230`
- 라인업: 시드 4번째 (TextField → Badge → Checkbox → **Switch**)
- 특이사항: **Radix UI 첫 도입 케이스** (`@radix-ui/react-switch@1.3.0`)

---

## 1. 요약

| 등급 | 건수 |
|------|------|
| Critical | 0 |
| High | 1 |
| Medium | 3 |
| Low | 3 |
| Pass | 12 |

전체적으로 시안 정합 + 토큰 준수가 매우 깔끔. Radix 도입 효과로 접근성/상태 분기가 자동 해결됐다. 다만 thumb shadow 하드코딩 1건과 disabled 상호작용 미세 결함이 발견됨.

---

## 2. 항목별 상세

### 2.1 Figma ↔ 코드 정합성

| 항목 | Figma | 코드 | 판정 |
|------|-------|------|------|
| Track sm | 32 × 18 | `h-[18px] w-[32px]` | Pass |
| Track md | 44 × 24 | `h-[24px] w-[44px]` | Pass |
| Thumb sm | 14 | `size-[14px]` | Pass |
| Thumb md | 20 | `size-[20px]` | Pass |
| Thumb off 위치 | translate-x 2px | `translate-x-[2px]` | Pass |
| Thumb on 위치 (sm) | 32 - 14 - 2 = 16 | `translate-x-[16px]` | Pass |
| Thumb on 위치 (md) | 44 - 20 - 2 = 22 | `translate-x-[22px]` | Pass |
| Track on 색 | `brand/500 #f97316` | `--color-brand-500` | Pass |
| Track off 색 | `semantic/border/strong #d4d4d4` | `--color-border-strong` | Pass |
| Thumb 색 | `action/text/on-brand #fff` | `--color-action-text-on-brand` | Pass |
| Label 색 | `semantic/text/primary` | `--color-text-primary` | Pass |
| Label gap | `space/sm = 8px` | `--space-sm` | Pass |
| Track radius | `radius/full` | `--radius-full` | Pass |
| Disabled opacity | `0.4` | `--opacity-disabled` | Pass |
| Label font (md) | `font-size/base 16` | `--font-size-base` | Pass |
| Label font (sm) | (시안 미정의) | `--font-size-sm 14px` | Warning — 시안에서 sm 라벨 변종이 명시되지 않음. 자체 결정값. |

### 2.2 토큰 준수

| 위치 | 값 | 판정 |
|------|----|------|
| Track bg/on | `var(--color-brand-500)` | Pass |
| Track bg/off | `var(--color-border-strong)` | Pass |
| Thumb bg | `var(--color-action-text-on-brand)` | Pass |
| Thumb **shadow** `0 1px 2px var(--color-neutral-opacity-300)` | offset/blur 하드코딩 | **High — shadow 토큰 미사용** |
| Outline color | `var(--color-brand-500)` | Pass |
| Outline width `2px`, offset `2px` | 하드코딩 | Low (focus shape는 토큰 부재) |
| Border width | `var(--border-width-thin)` | Pass |
| 트랙/썸 픽셀 박스 | 사용자 명시적으로 예외 허용 | Pass |
| Disabled opacity | `var(--opacity-disabled)` | Pass |
| Label gap | `var(--space-sm)` | Pass |
| Motion | `--motion-duration-base`, `--motion-easing-standard` | Pass |

### 2.3 Radix 활용 적절성 (핵심)

| 검사 | 결과 | 판정 |
|------|------|------|
| `data-state=checked` 기반 색/위치 분기 | `data-[state=checked]:bg-...`, `data-[state=checked]:translate-x-...` 사용. JS 분기 0개 | Pass |
| controlled / uncontrolled API | `checked`, `defaultChecked`, `onCheckedChange` 모두 Radix props spread | Pass |
| `role="switch"`, `aria-checked` 자동 부여 | Radix Root가 처리 | Pass |
| Space 키 토글 | Radix 기본 | Pass |
| Props spread | `{...rest}`로 `name`, `value`, `required`, `onCheckedChange` 등 전달 | Pass |
| focus-visible 처리 | Radix 기본 사용 + Tailwind `focus-visible:outline-*` 직접 추가 | Pass (중복 아님, 시각 스타일은 우리 책임) |
| Label ↔ Root 연결 | `id` ↔ `htmlFor` 자동 ID 패턴 | Pass |
| `asChild` 차단 | Props 타입에서 `Omit<..., "asChild">` 명시 | Pass — 좋은 가드 |
| Radix Thumb 사용 | `SwitchPrimitives.Thumb`에 transform 직접 부여 | Pass |
| Enter 키 토글 | Radix는 **Space만** 토글, Enter는 토글 안 함 (WAI-ARIA 권장) | Pass — 다만 사용자 요청서의 "Space/Enter 토글" 중 Enter는 의도적으로 비활성. 명시 필요 |

### 2.4 접근성

| 항목 | 결과 |
|------|------|
| `role="switch"` | Pass (Radix 자동) |
| `aria-checked` | Pass |
| 라벨 클릭 토글 | Pass (`<label htmlFor>` ↔ Root `id`) |
| focus-visible 시각 피드백 | Pass (outline brand-500) |
| disabled Tab skip | Pass (Radix가 `disabled` 속성 부여) |
| label 미지정 시 `aria-label` 필요 안내 | Warning — Storybook `RealWorldExamples`에선 `aria-label` 명시했지만 README/JSDoc에서 가이드 없음 |
| **Disabled wrapper에 `cursor-not-allowed`** | Medium — wrapper `<span>`이 click 이벤트를 받지 않으므로 효과 없음. 라벨에는 적용되어 무난. |

### 2.5 일관성 (Checkbox 패턴 대비)

| 항목 | Checkbox | Switch | 판정 |
|------|----------|--------|------|
| forwardRef | Yes | Yes | Pass |
| displayName | Yes | Yes | Pass |
| 폴더 + barrel | Yes | Yes | Pass |
| `useId` 자동 id | Yes | Yes | Pass |
| Label은 컴포넌트 내부 렌더 | Yes (`<label>`로 전체 감쌈) | Yes (별도 `<label htmlFor>`) | Medium — 구조가 다름. Checkbox는 `<label>`이 박스+텍스트 모두 감싸므로 박스 클릭도 label로 처리. Switch는 외부 `<span>` 래퍼라서 박스 클릭은 Radix Root가 받고 텍스트는 별도 label. 결과는 동등하나 패턴 불일치. |
| Stories 구조 | Default/States/Sizes/Controlled/Dark | 동일 패턴 | Pass |

### 2.6 다크모드

| 항목 | 결과 |
|------|------|
| Track off 색 (border-strong → 다크 시 neutral-300이 다크 토큰으로 스왑됨) | Pass — 토큰 의존 |
| Track on 색 (brand-500 고정) | Pass |
| Thumb 흰색 | Pass — 다크에서도 대비 충분 |
| **Thumb shadow `neutral-opacity-300`** = `oklch(0 0 0 / 0.12)` | Warning — 흑색 알파라 다크 배경에선 거의 안 보임. 시각적 결함은 아니지만 라이트/다크 동등하지 않음. semantic shadow 토큰으로 분리 시 다크 대응 가능 |
| Label color | Pass (text-primary 토큰) |

---

## 3. 권장 수정 사항

### High 1 — Thumb shadow 인라인 box-shadow

**위치**: `Switch.tsx:60`
```tsx
"shadow-[0_1px_2px_0_var(--color-neutral-opacity-300)]",
```
**문제**: offset/blur 하드코딩. 다른 컴포넌트에서 재사용 불가하고, 다크모드에서 검은 알파 그림자가 잘 안 보임.

**제안**: `src/tokens/`에 `--shadow-thumb` (또는 `--shadow-xs`) semantic 토큰 추가 후 사용.
```tsx
"shadow-[var(--shadow-thumb)]",
```
토큰 정의 예시 (라이트/다크 분리):
```css
--shadow-thumb: 0 1px 2px 0 var(--color-neutral-opacity-300);
/* dark */ --shadow-thumb: 0 1px 2px 0 oklch(0 0 0 / 0.4);
```

### Medium 1 — Disabled wrapper의 `cursor-not-allowed` 무효

**위치**: `Switch.tsx:70`
```tsx
disabled ? "opacity-[var(--opacity-disabled)] cursor-not-allowed" : "",
```
**문제**: wrapper `<span>`은 클릭 타겟이 아니므로 cursor가 적용되지 않는다. 실제로는 Root와 label에 따로 줘야 한다.

**제안**: wrapper에서 cursor 클래스 제거. Root는 Radix가 `disabled` 시 자동 처리되며 코드에 이미 `disabled:cursor-not-allowed` 있음. Label에도 이미 분기되어 있음 → wrapper만 정리하면 됨.

### Medium 2 — Checkbox와 라벨 마크업 패턴 불일치

**위치**: `Switch.tsx:82-106` vs `Checkbox.tsx:95-128`
**문제**: Checkbox는 `<label>`이 전체를 감싸 박스 클릭도 라벨 위임. Switch는 외부 `<span>` + 분리된 `<label htmlFor>`.

**제안**: 현재 Switch 방식이 Radix 권장 패턴에 더 가까움. 오히려 **Checkbox를 Radix Checkbox로 마이그레이션할 때 Switch 패턴으로 통일**하는 게 향후 일관성에 좋음. 이번 PR에서는 손대지 말 것.

### Medium 3 — Label sm 변종이 시안에 없음

**위치**: `Switch.tsx:29-32` `LABEL_FONT`
**문제**: Figma Documentation은 `md + hasLabel` 조합만 명시. sm + hasLabel은 우리가 자체 결정.

**제안**: 디자이너에게 확인 요청. 현 구현은 `font-size-sm 14px`로 합리적이나 시안 부재 사실은 기록.

### Low 1 — Outline width/offset 하드코딩

`focus-visible:outline-2 focus-visible:outline-offset-2` → 향후 `--focus-ring-width`, `--focus-ring-offset` 토큰화 권고. 다른 컴포넌트(Button/TextField/Checkbox)와 동시 적용해야 의미 있음.

### Low 2 — `aria-label` 가이드 부재

라벨 없이 사용할 때 `aria-label` 필요하다는 안내가 어디에도 없음. Storybook `WithoutLabel` 스토리에 주석 또는 JSDoc 추가 권고.

### Low 3 — `defaultChecked` 동시 제어 가드 부재

`checked`와 `defaultChecked`를 동시에 주면 Radix가 controlled 모드로 동작하지만 경고는 없음. 개발자 실수 방지를 위해 dev-only `console.warn` 추가는 선택 사항.

---

## 4. Figma 시안 vs 코드

- Figma 시안 (Component Set 128:66): 4종 — sm/off, sm/on, md/off, md/on (각각 label 변종 포함)
- 다크모드 시안 부재 → 코드 자체 판단 영역
- `disabled = true` 컬럼이 Figma Documentation에서 비어 있음 → 코드는 `opacity-disabled` 토큰으로 처리, 시안 의도와 일치

스크린샷 캡처 URL은 본 리포트의 컨텍스트(MCP)에서 직접 확인 가능. 시각적 차이는 발견되지 않음.

---

## 5. 픽스 우선순위

1. **(High)** Thumb shadow 토큰화 — `--shadow-thumb` semantic 토큰 신설 후 라이트/다크 분리.
2. **(Medium)** wrapper에서 `cursor-not-allowed` 제거 (무효 코드).
3. **(Medium)** sm + hasLabel 시안 디자이너 확인.
4. **(Low)** `aria-label` 가이드 JSDoc/스토리 주석 추가.
5. **(Low)** focus-ring 토큰화는 디자인 시스템 단위 작업으로 별도 묶음.

---

## 6. Radix 도입 회고

### 6.1 코드량

| 지표 | Checkbox (native) | Switch (Radix) |
|------|-------------------|----------------|
| 라인 수 (tsx 본체) | 175 | 111 |
| 보일러플레이트 | `useEffect`로 `indeterminate` 동기화, `setRefs` 헬퍼, `peer` 클래스로 input↔box 시각 연결 | 없음. `{...rest}` 한 번이면 끝. |
| 상태 분기 방식 | JS isFilled 계산 → 클래스 분기 | CSS `data-[state=checked]:` 분기 |

Switch는 Checkbox 대비 **약 36% 적은 라인**. 특히 `indeterminate` 같은 명령형 동기화 코드가 0이라는 게 가장 큼.

### 6.2 접근성 이득

- `role="switch"`, `aria-checked` 자동 — native input엔 없는 패턴이라 직접 구현했다면 추가 코드 필요.
- Space 키 토글, disabled 시 focus skip 자동.
- focus 관리는 Radix가 처리하므로 우리는 시각 스타일만 책임.
- 결과: 접근성 테스트 통과 보장 수준이 native 구현 대비 확실히 높음.

### 6.3 유지보수 이득

- 상태가 DOM의 `data-state` 속성에 노출되므로 **스타일링이 선언적**. JS와 CSS가 분리되어 디버깅이 쉽고, 디자인 토큰만 갈아끼우면 됨.
- controlled/uncontrolled API 분기를 우리가 안 짜도 됨. (Checkbox는 `checked === undefined && defaultChecked === true` 같은 분기를 직접 작성했음.)
- `asChild`는 우리 컴포넌트 API 명세를 흐릴 수 있어 `Omit`으로 차단. 좋은 결정.

### 6.4 비용

- 번들 사이즈: `@radix-ui/react-switch` 약 ~3KB gzip 추가. 시드 라인업 전체를 Radix로 가면 누적 부담은 모니터링 필요.
- 학습 비용: `data-state` 패턴, controlled API의 prop 이름(`onCheckedChange` ≠ native `onChange`)에 대한 팀 합의 필요.
- 종속성 락인: Radix 메이저 업그레이드 시 마이그레이션 작업 발생.
- 시각 스타일은 여전히 우리 책임 — Radix는 "headless"라서 디자인 토큰 관리 부담은 동일.

### 6.5 결론

**Radix 도입은 명백히 이득.** 특히 Switch처럼 ARIA 패턴이 native HTML에 없는 컴포넌트는 Radix가 사실상 표준. 다음 우선 마이그레이션 대상: **Checkbox** (indeterminate 동기화 코드 제거 가능), **Dialog/Popover/Tooltip** (포커스 트랩/포털).

단, **Button/Badge/TextField처럼 native semantic이 이미 충분한 컴포넌트는 Radix를 강제하지 말 것**.
