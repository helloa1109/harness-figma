# QA Report — IconButton

- 날짜: 2026-06-06
- 범위: `src/components/IconButton/{IconButton.tsx,index.ts,IconButton.stories.tsx}`
- Figma: Component Set `137:38`, Documentation `141:333`
- 라인업: 시드 5번째 / 마지막 (TextField → Badge → Checkbox → Switch → **IconButton**)
- 특이사항: **Radix 미사용 — native `<button>`** 자체 구현. 시안 변종 18 = 3 variant × 3 size × 2 disabled.

---

## 1. 요약

| 등급 | 건수 |
|------|------|
| Critical | 0 |
| High | 1 |
| Medium | 2 |
| Low | 3 |
| Pass | 18 |

핵심 a11y(`aria-label` 타입 필수화, `aria-hidden` 아이콘 슬롯, native button) 모두 충족. 토큰 매핑은 시안과 1:1. High 1건은 ghost variant의 hover 색이 다크모드에서 가독성 측면으로 의문이 남는 부분.

---

## 2. 항목별 상세

### 2.1 Figma ↔ 코드 정합성

| 항목 | Figma | 코드 | 판정 |
|------|-------|------|------|
| Box sm | 32 × 32 | `size-[32px]` | Pass |
| Box md | 40 × 40 | `size-[40px]` | Pass |
| Box lg | 48 × 48 | `size-[48px]` | Pass |
| Icon sm | 16 | `size-[16px]` | Pass |
| Icon md | 20 | `size-[20px]` | Pass |
| Icon lg | 24 | `size-[24px]` | Pass |
| Radius | `radius/sm 4` | `var(--radius-sm)` | Pass |
| Primary bg | `brand/500 #f97316` | `var(--color-action-bg-default)` (= brand-500) | Pass |
| Primary icon | `action/text/on-brand #fff` | `var(--color-action-text-on-brand)` | Pass |
| Secondary bg | `semantic/surface/subtle #fafafa` | `var(--color-surface-subtle)` | Pass |
| Secondary icon | `semantic/text/primary #171717` | `var(--color-text-primary)` | Pass |
| Ghost bg | transparent | `bg-transparent` | Pass |
| Ghost icon | `semantic/text/secondary #525252` | `var(--color-text-secondary)` | Pass |
| Disabled opacity | `0.4` | `var(--opacity-disabled)` | Pass |
| hover/active 분기 | 시안에 정의 없음 | 코드에서 정의 | Warning — 시안에 인터랙션 상태 미정의. 코드 측 자체 결정값. |

### 2.2 토큰 준수

| 위치 | 값 | 판정 |
|------|----|------|
| Primary bg | `var(--color-action-bg-default)` | Pass |
| Primary hover | `var(--color-action-bg-hover)` (= brand-600) | Pass |
| Primary active | `var(--color-action-bg-pressed)` (= brand-700) | Pass |
| Primary text | `var(--color-action-text-on-brand)` | Pass |
| Secondary bg | `var(--color-surface-subtle)` | Pass |
| Secondary hover | `var(--color-neutral-200)` | Pass — primitive 직접 참조이나 다른 컴포넌트와 동일 패턴 |
| Secondary active | `var(--color-neutral-300)` | Pass |
| Ghost hover | `var(--color-neutral-100)` | **High — 다크모드 항목 참조** |
| Ghost active | `var(--color-neutral-200)` | Pass |
| Radius | `var(--radius-sm)` | Pass |
| Disabled opacity | `var(--opacity-disabled)` | Pass |
| Transition duration | `var(--motion-duration-fast)` | Pass |
| Transition easing | `var(--motion-easing-standard)` | Pass |
| Box 픽셀(32/40/48) | 사용자 명시적으로 예외 허용 | Pass |
| Icon 픽셀(16/20/24) | 사용자 명시적으로 예외 허용 | Pass |
| focus-visible outline width `2px`, offset `2px` | 하드코딩 | Low — Switch와 동일 이슈, 프로젝트 공통 |
| focus-visible outline color | `var(--color-brand-500)` | Pass |
| 하드코딩 컬러 검색 | 없음 | Pass |

### 2.3 접근성

| 항목 | 결과 | 판정 |
|------|------|------|
| `aria-label` 타입 필수화 | `Omit<..., "aria-label">` + `"aria-label": string` 재선언 → 미입력 시 TS 에러 | **Pass — IconButton 핵심 a11y 요구사항 충족** |
| native `<button>` | Space/Enter 자동, 포커스 자동, form 통합 | Pass |
| `type="button"` 기본값 | 의도치 않은 폼 submit 방지 | Pass |
| 아이콘 `aria-hidden="true"` | 스크린리더 중복 읽기 방지 | Pass |
| focus-visible 시각 피드백 | outline 2px / offset 2px / brand-500 | Pass |
| disabled 시각 | `disabled:cursor-not-allowed` + `opacity-disabled` | Pass |
| disabled hover 무효화 | `disabled:hover:bg-[unset]` | Pass |
| 키보드 click 동작 | native 위임 | Pass |

### 2.4 일관성 (Badge/Checkbox/Switch 비교)

| 항목 | 결과 | 판정 |
|------|------|------|
| `forwardRef` | 적용 | Pass |
| `displayName` | `"IconButton"` 설정 | Pass |
| 폴더 구조 `IconButton/` | 적용 | Pass |
| `index.ts` re-export | 컴포넌트 + 타입 3종 | Pass |
| 타입 export | `IconButtonProps/Size/Variant` | Pass |
| Storybook 스토리 구성 | Default/Secondary/Ghost/Disabled/SizeMatrix/VariantMatrix/FullMatrix/RealWorldExamples/DarkMode | Pass — Switch 패턴과 동일 |
| FullMatrix 패턴 | disabled 2 × size 3 × variant 3 = 18 | Pass |

### 2.5 다크모드

| 항목 | 결과 | 판정 |
|------|------|------|
| Primary (brand-500 고정) | 다크모드에서도 동일 brand 컬러 | Pass — `action-text-on-brand`는 고정 흰색 토큰 |
| Secondary `surface-subtle` | 다크모드 매핑 존재 (`neutral-50` → 다크 매핑) | Pass |
| Ghost hover `neutral-100` | 라이트: `#F5F5F5`, 다크: `#262626` — 다크에서 ghost 위 hover가 너무 어두워 ghost(transparent) 배경 대비가 미세함 | **Medium — 시각적 어포던스 약함** |
| Ghost text `text-secondary` | 다크 매핑 존재 | Pass |
| DarkMode story 18 조합 | 모두 렌더 확인 | Pass |

### 2.6 icon 슬롯 처리

| 항목 | 결과 | 판정 |
|------|------|------|
| `currentColor` 매칭 | 스토리 SVG `stroke="currentColor"` → variant 텍스트색이 아이콘 stroke로 자동 전파 | Pass |
| SVG 박스 fit | 스토리 SVG `width="100%" height="100%"` + 슬롯 `inline-flex items-center justify-center size-[N]` | Pass |
| `fill="none"` 디폴트 가이드 | 컴포넌트 내부에서 강제하지 않음 — 호출자 책임 | Low — 문서에 "SVG는 width/height 100%, stroke=currentColor" 가이드 필요 |
| InstanceSwap 추상화 | `icon: ReactNode` 슬롯 | Pass |

---

## 3. 픽스 우선순위

### High
1. **Ghost variant hover 다크모드 어포던스 (`IconButton.tsx:43`)**
   - 현재: `hover:bg-[var(--color-neutral-100)]` — 다크에서 `#262626` (배경 `neutral-900 #171717`와 차이 ~15)
   - 제안: ghost 전용 hover 토큰 신설(예: `--color-action-bg-ghost-hover`)이 베스트. 차선으로 `neutral-200` (다크 `#404040`) 사용 검토. 단, `src/tokens/` 수정은 별도 작업으로 분리.

### Medium
2. **시안 정적 → 코드 인터랙션 상태 자체 결정 (문서화 필요)**
   - hover/active 토큰 분기(`action-bg-hover/pressed`, `neutral-200/300`)는 시안에 명시되지 않음. 컴포넌트 docstring 또는 Storybook `parameters.docs.description`에 "Figma 시안은 정적이며 hover/active 토큰은 프로젝트 공통 인터랙션 규칙을 따른다" 한 줄 명시 권장.
3. **icon 호출 가이드 명시**
   - `IconButtonProps.icon`의 JSDoc에 "SVG는 `width="100%" height="100%"`, 색은 `stroke="currentColor"` 또는 `fill="currentColor"` 권장" 1줄 추가.

### Low
4. **focus-visible outline 하드코딩 (`IconButton.tsx:66`)** — Switch와 동일 이슈. 프로젝트 공통 해결로 묶을 것.
5. **disabled hover 무효화 패턴** — `disabled:hover:bg-[unset]` 잘 동작하나 active도 명시적으로 막아두면 안전 (`disabled:active:bg-[unset]`).
6. **VariantMatrix size 라벨 칸 폭(`3rem`) 하드코딩 (`IconButton.stories.tsx:87`)** — 토큰화 대상은 아니나 다른 스토리(FullMatrix `2rem`)와 불일치.

---

## 4. 시드 라인업 5개 마무리 회고

TextField → Badge → Checkbox → Switch → IconButton 사이클을 통해 figma-component-builder 파이프라인은 안정 단계에 진입했다. 토큰 레이어가 충분히 두꺼워진 결과, 다섯 번째 컴포넌트인 IconButton에서는 새로 만들어야 했던 토큰이 0개였고, 하드코딩 컬러도 0건이었다. semantic action(`action-bg-default/hover/pressed`, `action-text-on-brand`)과 surface/text 시맨틱 레이어가 결정적 역할을 했으며, 18 variant를 코드에서는 3 + 3 + 1 = 7개의 조합 규칙으로 압축할 수 있었다(시안의 "변종 수"와 코드의 "복잡도"가 비례하지 않는다는 점이 확인됐다).

남은 공통 부채는 두 가지로 수렴한다. (1) **focus-visible outline 토큰 부재** — 5개 컴포넌트 모두 동일하게 `2px/2px/brand-500`을 하드코딩 중. `--focus-ring-width/offset/color` 신설로 한 번에 해소 가능. (2) **인터랙션 상태(hover/active)의 시안 부재** — Figma는 정적 시안만 제공하므로 코드 측이 "프로젝트 공통 인터랙션 규칙"을 따른다는 합의를 어딘가에 문서화해야 한다. 또한 Radix 도입 여부 판단 기준도 명확해졌다: 키보드 상호작용·포커스 트랩·ARIA 상태가 복잡하면 Radix(Switch/Checkbox), 단일 native 엘리먼트로 충분하면 자체 구현(Badge/IconButton). 시드 단계는 여기서 닫고, 다음은 토스 카탈로그 Tier 2(Dropdown/Tooltip 등)로 진입할 수 있다.
