# 디자인 리뷰 — 2026-06-06

> **검사 대상:** `src/components/ui/` (Button, TripCard) + `src/tokens/`
> **검사자:** design-reviewer agent (시니어 UX 엔지니어 관점)
> **이전 QA 리포트:** `docs/QA-Report-2026-06-06.md` (코드 정합성 8건 픽스 완료)
> **이 리뷰의 초점:** 디자인 시스템 성숙도 — 컬러 대비 정량 검증, 인터랙션 패턴 일관성, 의미적 토큰 선택, 다크모드 위계 보존

---

## 1. 요약

| 카테고리 | Pass | Warning | Fail |
|---|---|---|---|
| 접근성 — 컬러 대비 (WCAG AA) | 6 | 2 | **3** |
| 접근성 — 키보드/시맨틱/aria | 4 | 1 | **1** |
| 시각 일관성 — 인터랙션 패턴 | 1 | 2 | **1** |
| 시각 일관성 — 라디우스/스페이싱/타이포 | 4 | 1 | 0 |
| 토큰 준수 — 하드코딩 색출 | 3 | 1 | **1** |
| 토큰 준수 — 의미적 사용 | 2 | 2 | 0 |
| **합계** | **20** | **9** | **6** |

- **Critical 이슈:** 2건 (brand-500 텍스트 대비 미달, Button focus 스타일 부재)
- **Major 이슈:** 3건
- **Minor 이슈:** 4건
- **릴리즈 가능 여부:** **NO-GO** — Critical 2건은 접근성 법규(WCAG AA) 위반이며 디자인 시스템 토큰 자체의 의미 수정이 필요

이전 QA 리포트가 코드/문법 레벨 정합성에 집중했다면, 이번 리뷰는 **실제 사용자가 겪을 디자인 품질 결함**을 다룹니다. 따라서 8건 픽스 직후임에도 새로운 Critical 이슈가 노출되었습니다.

---

## 2. 접근성 — WCAG AA 컬러 대비 정량 검증

토큰 주석의 hex 값으로 실제 contrast ratio를 계산했습니다(sRGB → 상대휘도 → WCAG 공식). 본문 텍스트 기준 4.5:1, 큰 텍스트(18.66px 이상 또는 14px Bold) 기준 3:1, UI 구성요소 기준 3:1.

### 2-1. 라이트 모드

| 사용처 | 토큰 조합 | 실측 대비 | 기준 | 판정 |
|---|---|---:|---|---|
| Button primary 텍스트 | `neutral-0` on `brand-500` | **2.80:1** | 4.5:1 | **FAIL** |
| Button ghost 텍스트 | `brand-500` on `neutral-0` | **2.80:1** | 4.5:1 | **FAIL** |
| TripCard 가격(price) | `brand-500` on `neutral-0` | **2.80:1** | 4.5:1 (Bold 16px = 본문 취급) | **FAIL** |
| TripCard 카드 border | `neutral-200` on `neutral-0` | **1.26:1** | 3:1 (UI) | **FAIL** |
| TripCard 커버 placeholder | `brand-200` on `neutral-0` | **1.35:1** | 3:1 (UI) | Warning (장식성) |
| Button secondary 텍스트 | `neutral-900` on `neutral-200` | 14.23:1 | 4.5:1 | Pass |
| TripCard 제목 | `neutral-900` on `neutral-0` | 17.93:1 | 4.5:1 | Pass |
| TripCard 위치/기간 | `neutral-500` on `neutral-0` | 4.74:1 | 4.5:1 | Pass (마진 얇음) |
| TripCard 별점(rating) | `neutral-700` on `neutral-0` | 10.37:1 | 4.5:1 | Pass |

### 2-2. 다크 모드

| 사용처 | 토큰 조합 | 실측 대비 | 판정 |
|---|---|---:|---|
| Button primary 텍스트 | `neutral-0`(#0A0A0A) on `brand-500`(#F97316) | 7.06:1 | Pass |
| Button ghost / price | `brand-500` on `neutral-0`(#0A0A0A) | 7.06:1 | Pass |
| TripCard border | `neutral-200`(#404040) on `neutral-0`(#0A0A0A) | **1.91:1** | **FAIL** |
| 나머지 본문 | – | 7~19:1 | Pass |

### 2-3. 진단

핵심 원인은 **brand-500(#F97316 = 주황) 한 색상으로 light/dark 양쪽 텍스트를 모두 처리**한다는 점입니다. brand 색상이 mode-invariant인 것 자체는 정책이지만, "텍스트로 쓰는 brand"와 "배경으로 쓰는 brand"가 다른 단계여야 합니다.

- 라이트 모드 흰 배경 위 텍스트로 쓰려면 최소 **brand-700**(#C2410C, 추정 4.6:1)이 필요
- 라이트 모드 brand 배경 위 흰 텍스트(Button primary)도 brand-500은 부족 — **brand-600**(#EA580C) 이상이어야 함

이는 컴포넌트 한 줄을 고치는 문제가 아니라 **토큰 의미 레이어(semantic token) 부재**로 인한 시스템 결함입니다.

### 2-4. Critical 이슈

**[Critical] CR-1 — Button primary 흰 텍스트 대비 미달 (라이트 모드)**
- 위치: `src/components/ui/Button.css:19-21`
- 현재: `background: var(--color-brand-500); color: var(--color-neutral-0);` → 2.80:1
- 영향: 가장 자주 쓰는 1차 CTA가 WCAG AA 미달. 시각 약자 사용자 행동 차단.
- 제안:
  ```css
  .btn--primary {
    background: var(--color-brand-600); /* 또는 brand-700 */
    color: var(--color-neutral-0);
  }
  ```
  또는 의미 토큰을 도입: `--color-action-bg: var(--color-brand-600);`

**[Critical] CR-2 — brand-500 텍스트(Ghost 버튼, TripCard 가격) 대비 미달**
- 위치: `src/components/ui/Button.css:28`, `src/components/ui/TripCard.css:75`
- 현재: `color: var(--color-brand-500);` on `--color-neutral-0` → 2.80:1
- 제안: 텍스트 전용 brand 토큰을 분리
  ```css
  /* src/tokens/colors.css */
  --color-brand-text: var(--color-brand-700);  /* light: 4.6:1 이상 */
  @media (prefers-color-scheme: dark) {
    :root { --color-brand-text: var(--color-brand-400); }
  }
  ```
  컴포넌트는 `color: var(--color-brand-text);`로 변경.

**[Major] MJ-1 — TripCard border 대비 미달 (양 모드)**
- 위치: `src/components/ui/TripCard.css:9`
- 현재: `border: 0.0625rem solid var(--color-neutral-200);` → 라이트 1.26:1 / 다크 1.91:1
- 판단: border는 컴포넌트 구분을 위한 UI 요소이므로 3:1 권장. 다만 카드 자체가 인터랙티브하지 않다면 장식으로 간주해 통과 가능.
- 제안: 카드를 클릭 가능하게 만들 계획이라면 `neutral-300` 이상으로 상향, 아니라면 border 제거하고 그림자 토큰 도입 검토.

---

## 3. 접근성 — 키보드 / 시맨틱 / aria

| 항목 | 상태 | 비고 |
|---|---|---|
| Button — `:focus-visible` | **FAIL** | `Button.css`에 포커스 스타일이 **전혀 없음** |
| TripCard — `:focus-visible` | Pass | `TripCard.css:15-18` ✓ (단, 카드 자체가 비인터랙티브) |
| Button — disabled 시각 + aria | Warning | opacity 0.4 → 다크 모드에서 거의 안 보임. `aria-disabled` 부재 |
| TripCard — 시맨틱 마크업 | Pass | `<article>` + `<h3>` 구조 적절 |
| TripCard — 이미지 alt | Pass | `${title} 사진` |
| TripCard — 별점 aria-label | Pass | "별점 N점, 리뷰 M개" 스크린리더 흐름 자연스러움 |
| 다크 모드 backgrounds 값 | Warning | 스토리에서 `#171717` 하드코딩(`TripCard.stories.tsx:79`) |

### Critical 이슈

**[Critical] CR-3 — Button에 `:focus-visible` 스타일 부재**
- 위치: `src/components/ui/Button.css` (전체)
- 현재: hover만 정의, 키보드 포커스 가시 표시 없음. 브라우저 기본 outline에 의존.
- 문제: TripCard에는 focus-visible이 있는데 Button에는 없음 → **인터랙션 시스템 불일치**. 디자인 시스템 1차 CTA에 키보드 포커스 링이 없는 것은 WCAG 2.4.7(Focus Visible) 위반 가능.
- 제안:
  ```css
  .btn:focus-visible {
    outline: 0.125rem solid var(--color-brand-500);
    outline-offset: 0.125rem;
  }
  ```

### Major

**[Major] MJ-2 — Button disabled 다크 모드 가독성**
- 위치: `src/components/ui/Button.css:15`
- 현재: `.btn:disabled { opacity: 0.4; }` — 다크 배경에서 텍스트가 1.5:1 이하로 떨어질 수 있음
- 제안: opacity 대신 색상 토큰 사용 (`background: var(--color-neutral-200); color: var(--color-neutral-500);`) + `aria-disabled` prop 처리

### Minor

**[Minor] MN-1 — 다크 스토리 배경색 하드코딩**
- 위치: `src/components/ui/TripCard.stories.tsx:79`
- 현재: `values: [{ name: "dark", value: "#171717" }]`
- 문제: 토큰이 바뀌면 스토리만 어긋남
- 제안: CSS 변수 직접 사용은 Storybook addon 한계로 어려우니, 주석으로 "이 값은 `--color-neutral-50` 다크값과 동기화 필요"를 남기거나, `decorators`에서 `background: var(--color-neutral-0)`로 대체.

---

## 4. 시각 일관성 — 인터랙션 패턴

| 패턴 | Button | TripCard | 평가 |
|---|---|---|---|
| `:hover` | `opacity 0.85` | 없음 | Warning — 카드도 클릭 가능하다면 통일 필요 |
| `:focus-visible` | **없음** | `outline 2px brand-500` | **FAIL** — 컴포넌트 간 정책 불일치 |
| `:active` | 없음 | 없음 | Warning — press feedback 부재 |
| `transition` | `opacity 120ms ease` | `opacity 120ms ease` | Pass (값 일치) — 단 토큰 없음 |
| `:disabled` | `opacity 0.4` | N/A | – |

### Major

**[Major] MJ-3 — 인터랙션 토큰 부재**
- 위치: `Button.css:11`, `TripCard.css:12`
- 현재: `transition: opacity 120ms ease;`가 두 파일에 동일 값으로 중복
- 문제: motion 토큰이 없으면 컴포넌트가 늘어날수록 값이 분기될 가능성 큼. 또한 `prefers-reduced-motion` 대응 누락.
- 제안:
  ```css
  /* src/tokens/motion.css (신규) */
  :root {
    --duration-fast: 120ms;
    --easing-standard: ease;
    --focus-ring-width: 0.125rem;
    --focus-ring-offset: 0.125rem;
  }
  @media (prefers-reduced-motion: reduce) {
    :root { --duration-fast: 0ms; }
  }
  ```

### Minor

**[Minor] MN-2 — `:active` press 피드백 부재**
- Button, TripCard 모두 active 상태 시각 피드백 없음. 모바일 탭 응답성 저하.
- 제안: `transform: scale(0.98)` 또는 background 한 단계 어둡게.

---

## 5. 시각 일관성 — 라디우스 / 스페이싱 / 타이포 위계

| 항목 | 검사 결과 |
|---|---|
| 라디우스 정책 | Button `radius-md`(8px), TripCard `radius-lg`(12px), 커버 `radius-md` — **의도적 위계** 존재. Pass |
| 8pt grid 준수 | 모든 padding/gap이 `--space-*` 토큰 사용. Pass |
| 폰트 위계 | TripCard 제목 `lg/bold/tight`, 가격 `base/bold`, 본문 `sm/normal/base` — 명확한 3단 위계. Pass |
| 다크 모드 시각 위계 보존 | brand 색상은 mode-invariant라 다크에서 가격이 **너무 튄다** (7:1로 제목과 동급) | Warning |
| 시각 노이즈 | 카드 border 1px + 내부 radius — 조합 OK, 그림자 없어 깔끔 | Pass |

### Warning

**[Warning] WN-1 — 다크 모드에서 가격 강조 과잉**
- 다크 모드의 brand-500 on neutral-0(#0A0A0A) = 7.06:1
- 다크 모드의 제목(neutral-900) = 18.97:1
- 두 텍스트가 거의 같은 시각 가중치 → 가격이 제목과 경쟁
- 제안: 가격에 brand-400을 쓰거나, 위에서 제안한 `--color-brand-text` 의미 토큰을 도입해 light/dark에서 자동으로 적정 단계 선택.

---

## 6. 토큰 준수

### 6-1. 하드코딩 색출

| 파일:줄 | 값 | 평가 |
|---|---|---|
| `Button.css:11` | `120ms ease` | duration/easing 토큰 부재로 인한 하드코딩 — MJ-3 참고 |
| `Button.css:14,15` | `opacity: 0.85`, `0.4` | opacity 토큰 부재 |
| `TripCard.css:9` | `0.0625rem` (= 1px) | border-width 토큰 부재(허용 범위지만 일관성 위해 토큰화 권장) |
| `TripCard.css:12` | `120ms ease` | 동일 |
| `TripCard.css:16,17` | `0.125rem` outline width/offset | 동일 |
| `TripCard.stories.tsx:79` | `#171717` | MN-1 참고 |

색상/스페이싱/라디우스/타이포는 **100% 토큰화** 되어 있습니다. 다만 **motion·opacity·border-width·outline 토큰 카테고리가 비어 있어** 이 영역에서 자연스레 하드코딩이 발생합니다.

### 6-2. 의미적 토큰 사용 적절성

| 사용처 | 현재 토큰 | 평가 |
|---|---|---|
| TripCard 커버 placeholder 배경 | `brand-200` | Warning — brand 색상을 "이미지 없음" 자리에 쓰면 빈 카드가 브랜드 메시지로 오인됨. `neutral-100/200`이 의미상 적절 |
| TripCard 가격 텍스트 | `brand-500` | Warning — 가격을 brand로 강조하는 정책 자체는 OK지만, 대비 미달(§2)로 토큰을 brand-text 의미 토큰으로 교체 필요 |
| TripCard border | `neutral-200` | Pass (의미 OK, 대비는 §2-3) |
| Button ghost text | `brand-500` | Pass (의미 OK, 대비는 §2-3) |

### Major

**[Major] MJ-4 — placeholder 배경에 brand 사용**
- 위치: `src/components/ui/TripCard.css:23`
- 현재: `.trip-card__cover { background: var(--color-brand-200); }`
- 문제: 이미지 로드 실패/누락 시 카드 절반이 주황색으로 채워짐. 갤러리에서 N개가 한꺼번에 깨지면 페이지 전체가 브랜드 컬러로 도배됨.
- 제안: `background: var(--color-neutral-100);` (light) — neutral은 자동으로 다크 대응됨.

### 6-3. 누락된 토큰 단계

현재 누락되어 시스템 성숙도를 낮추는 토큰 카테고리:

1. **Motion**: duration, easing, reduced-motion 정책
2. **Border width**: 1px, 2px (현재 `0.0625rem` 하드코딩)
3. **Focus ring**: width, offset, color (TripCard에 인라인 값으로 존재)
4. **Opacity scale**: hover(0.85), disabled(0.4)
5. **Semantic color**: `--color-action-bg`, `--color-text-brand`, `--color-text-muted`, `--color-border-default` 등 — primitive 토큰만으로는 light/dark 양쪽에서 충분한 대비 보장 불가

---

## 7. 우선순위별 권장 수정

| 우선순위 | 영역 | 위치 | 조치 |
|---|---|---|---|
| **Critical** | 접근성 | `Button.css` | `:focus-visible` 스타일 추가 (CR-3) |
| **Critical** | 토큰/접근성 | `colors.css` + 컴포넌트 | `--color-brand-text` 의미 토큰 신설, brand-700(light)/brand-400(dark) 매핑 (CR-1, CR-2) |
| **Critical** | 토큰/접근성 | `Button.css:19` | primary 배경을 brand-600 이상으로 (CR-1) |
| Major | 시스템 | `src/tokens/motion.css` 신설 | duration/easing/focus-ring/opacity 토큰화 (MJ-3) |
| Major | 토큰 의미 | `TripCard.css:23` | placeholder 배경 → `neutral-100` (MJ-4) |
| Major | 접근성 | `Button.css:15` | disabled를 opacity 대신 색상 토큰으로 (MJ-2) |
| Major | 시각 | `TripCard.css:9` | 카드 클릭 가능화 결정 후 border 색 재정의 (MJ-1) |
| Minor | 인터랙션 | 양쪽 | `:active` press 피드백 추가 (MN-2) |
| Minor | 일관성 | `TripCard.stories.tsx:79` | 다크 배경값 토큰 동기화 주석 (MN-1) |

---

## 8. 디자인 시스템 성숙도 평가

| 차원 | 점수 (0–5) | 근거 |
|---|---|---|
| Primitive 토큰 커버리지 | 4 | color/space/radius/typo는 견고, motion·opacity·border 누락 |
| Semantic 토큰 레이어 | **1** | `--color-success` 외 의미 토큰 없음. brand가 텍스트/배경 모두를 직접 담당해 light/dark 대비 깨짐 |
| 접근성 (WCAG AA) | **2** | brand-500 텍스트 3건 대비 미달 + Button focus 부재 |
| 컴포넌트 간 일관성 | 3 | 파일/네이밍 패턴은 일치, 인터랙션 정책(focus-visible)이 컴포넌트별로 다름 |
| 다크 모드 위계 보존 | 3 | 동작은 하나 brand 색이 다크에서 과강조됨 |
| **총합** | **13/25** | 정착 초기 단계 (foundation은 강하나 의미 레이어 미성숙) |

---

## 9. 결론

**릴리즈 가능 여부: NO-GO**

이전 QA 리포트가 "코드 정합성"에 대해 GO with conditions를 부여한 것은 타당했으나, **실제 사용자 관점의 디자인 품질**에서는 brand-500을 텍스트와 1차 CTA 배경에 사용하는 토큰 정책이 WCAG AA를 통과하지 못합니다. 이는 컴포넌트 픽스가 아닌 **토큰 레이어 재설계**가 필요한 시스템 이슈입니다.

**핵심 권고 — 의미 토큰 레이어 도입**

```css
/* src/tokens/colors.css 하단에 추가 */
:root {
  --color-action-bg: var(--color-brand-600);      /* primary CTA 배경 (light AA 통과) */
  --color-action-bg-hover: var(--color-brand-700);
  --color-text-brand: var(--color-brand-700);     /* 본문 brand 텍스트 */
  --color-text-default: var(--color-neutral-900);
  --color-text-muted: var(--color-neutral-500);
  --color-border-default: var(--color-neutral-200);
  --color-surface: var(--color-neutral-0);
  --color-surface-placeholder: var(--color-neutral-100);
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-action-bg: var(--color-brand-500);    /* dark는 brand-500도 통과 */
    --color-text-brand: var(--color-brand-400);
  }
}
```

이 레이어가 들어가면 컴포넌트는 primitive(`brand-500`)가 아닌 의미(`action-bg`)를 참조하게 되어, 라이트/다크 양쪽에서 대비가 자동 보장되고 앞으로 신규 컴포넌트가 늘어나도 같은 결함이 반복되지 않습니다.

### Figma 동기화 시 재검증 필요 항목

- 브랜드 가이드라인에서 brand-500이 정말 텍스트 용도인지 vs 액센트 용도인지 확인
- 1차 CTA 배경의 디자인 의도 단계 (brand-500/600/700 중)
- 가격 강조의 의도된 시각 가중치 (제목과 동급인지 한 단계 낮은지)
- 카드 클릭 가능 여부 — 인터랙션 시 hover/active/focus 디자인이 시안에 존재하는지
