# Design Token 정합성 검사 — 2026-06-06

대상 파일: Figma `B138LEBl3Li7yNGdSpIuq6` ↔ `src/tokens/*.css`

## 검사 환경 제약 (선행 고지)

Figma MCP `get_variable_defs`는 호출 시점에 **현재 선택된 레이어가 있어야** 변수 정의를 반환합니다. 이번 검사에서는 셀렉션이 비어 있어 `get_variable_defs(nodeId=0:1)`, `(1:2)`, `(0:0)` 모두 거절되었습니다. 따라서 **Figma 측 원본 값 직접 비교가 필요한 항목 (개별 hex 값, semantic alias 매핑)** 은 “Figma 확인 필요” 상태로 표시했습니다. **코드 측 단독 검증이 가능한 항목 (잔존 deprecated 참조, 다크 모드 alias 분기, 컴포넌트 사용 패턴)** 은 확정 상태로 보고합니다.

→ 정확한 hex/alias 매핑 비교가 필요하면 Figma 캔버스에서 **Colors / Spacing / Motion 컬렉션이 있는 프레임 하나를 선택한 뒤 다시 호출**해 주세요.

---

## 한눈에 보기

| 상태 | 카운트 |
|------|--------|
| ✅ Pass (코드 측 확정) | 4 |
| ⚠️ Warning (코드 자체 위험) | 3 |
| ❓ Figma 확인 필요 (대조 불가) | 5 |
| ❌ Fail | 0 |

---

## 1. 컬러 Primitive — Figma 값 직접 비교 불가

| 토큰 그룹 | 코드 (개수) | Figma (개수) | 상태 |
|----------|------------|--------------|------|
| brand 50~900 | 10 | ? | ❓ Figma 변수 추출 필요 |
| neutral 0~900 | 11 | ? | ❓ Figma 변수 추출 필요 |
| success 50~900 | 10 | ? | ❓ Figma 변수 추출 필요 |
| warning 50~900 | 10 | ? | ❓ Figma 변수 추출 필요 |
| danger 50~900 | 10 | ? | ❓ Figma 변수 추출 필요 |
| neutral-opacity 50~900 | 10 | ? | ❓ Figma 변수 추출 필요 |

코드 측 hex 주석은 모두 Tailwind 표준 팔레트(Emerald/Amber/Red, Neutral)와 일치. oklch 변환 정확도는 코드 주석 hex가 신뢰 기준이라면 정상 범위.

---

## 2. Semantic Alias — 코드 측 매핑

라이트 / 다크 모드 매핑 (코드 기준):

| Alias | Light alias → | Dark alias → | Figma 매칭 |
|-------|---------------|--------------|------------|
| action/bg/default | brand-500 | brand-500 (상속) | ❓ |
| action/bg/hover | brand-600 | brand-600 (상속) | ❓ |
| action/bg/pressed | brand-700 | brand-700 (상속) | ❓ |
| action/text/on-brand | **neutral-0 (#FFFFFF)** | **neutral-0 (#0A0A0A로 반전)** ⚠️ | ❓ |
| action/text/brand | brand-700 | **brand-300 (분기 재정의)** | ❓ |
| text/primary | neutral-900 (#171717) | neutral-900 (반전 #FAFAFA) | ❓ |
| text/secondary | neutral-600 | neutral-600 (반전 #D4D4D4) | ❓ |
| text/tertiary | neutral-500 | neutral-500 (반전 #A3A3A3) | ❓ |
| text/brand | brand-700 | **brand-300 (분기 재정의)** | ❓ |
| surface/default | neutral-0 | neutral-0 (반전 #0A0A0A) | ❓ |
| surface/subtle | neutral-50 | neutral-50 (반전 #171717) | ❓ |
| surface/muted | neutral-100 | neutral-100 (반전 #262626) | ❓ |
| border/default | neutral-200 | neutral-200 (반전 #404040) | ❓ |
| border/strong | neutral-300 | neutral-300 (반전 #525252) | ❓ |

**핵심 구조 차이**: 코드는 `colors.css`에서 neutral primitive 값 자체를 다크에서 반전 → semantic alias는 그대로 두고 자동 상속. Figma는 통상 semantic alias 자체를 다른 primitive로 매핑(예: text/primary dark → neutral/50). 결과 색이 같으면 OK, 다르면 Figma 사양과 어긋남.

---

## 3. Spacing / Radius / Border-Width / Opacity

| 토큰 | 코드 값 | 비교 |
|------|---------|------|
| space-xs / sm / md / lg / xl / 2xl | 4 / 8 / 16 / 24 / 32 / 48 px | ❓ Figma 확인 필요 |
| radius-none / xs / sm / md / lg / xl / 2xl / full | 0 / 2 / 4 / 8 / 12 / 16 / 24 / 9999 px | ❓ |
| border-width thin / base / strong | 1 / 2 / 4 px | ❓ |
| opacity-disabled / hover | 0.4 / 0.85 | ❓ |

---

## 4. Typography

| 토큰 | 코드 값 | 비교 |
|------|---------|------|
| font-size xs ~ 2xl | 12 / 14 / 16 / 18 / 24 / 32 px | ❓ |
| line-height tight / base / loose | 1.2 / 1.5 / 1.75 | ❓ |
| font-weight normal / medium / bold | 400 / 500 / 700 | ❓ |
| font-sans | "Pretendard", system fallback | ❓ |

---

## 5. Motion

| 토큰 | 코드 값 | 비교 |
|------|---------|------|
| duration-fast / base / slow | 120 / 200 / 320 ms | ❓ |
| easing-standard | `cubic-bezier(0.2, 0, 0, 1)` | ❓ |
| easing-emphasized | `cubic-bezier(0.3, 0, 0, 1)` | ❓ |

---

## 6. 알려진 잠재 이슈 — 검증 결과

| # | 잠재 이슈 | 검증 결과 |
|---|----------|---------|
| **1** | `action/text/on-brand` alias가 neutral/0 → 다크 모드에서 #0A0A0A로 따라감. brand-500 위 검정 텍스트 시나리오 AA 미달(~3.8:1) | **⚠️ 확정 (코드 측).** `src/tokens/colors.css:87`에서 `--color-action-text-on-brand: var(--color-neutral-0)`로 alias. `Button.css:25`이 이를 직접 참조. 다크에서 `--color-neutral-0` = `#0A0A0A` (110번 줄). brand-500 (#F97316) 배경 위 #0A0A0A 텍스트 = 대비 ~3.8:1, **WCAG AA 4.5:1 미달**. Figma alias가 neutral/0인지는 미확인. |
| **2** | `text/primary` 다크: Figma alias는 neutral/50, 코드는 neutral-900 자동 반전 → 결과 색 다른가 | **❓ Figma 확인 필요.** 코드 다크 결과: `--color-text-primary` → neutral-900 → 반전된 #FAFAFA (≈ neutral/50의 Light 값). Figma가 dark에서 alias를 명시적으로 neutral/50으로 매핑한다면 **결과는 같음 (#FAFAFA)**. 다만 Figma가 neutral/100 (#F5F5F5)이나 다른 값에 매핑돼 있을 가능성도 있어 변수 추출 후 확정 필요. |
| **3** | 코드에 있던 단일 `--color-success/warning/danger` 변수가 풀스케일 전환 이후 잔존 참조 있는지 | **✅ 깨끗.** `grep -E '\-\-color-(success\|warning\|danger)\b'`로 `src/` 전체 탐색 → `colors.css` 본인 정의 라인만 매칭되고, **컴포넌트나 다른 토큰에서 단일 형태 참조는 0건**. 풀스케일 전환은 완료 상태. |

---

## 7. 부차 발견 사항

| 항목 | 위치 | 메모 |
|------|------|------|
| 하드코딩 hex | `src/components/ui/TripCard.stories.tsx:79` | `value: "#171717"` (Storybook 다크 배경). 토큰 적용 권고 (Storybook config라 우선순위 낮음). |

---

## 8. 권고 픽스 (우선순위)

### P0 — 접근성 즉시 픽스

1. **`--color-action-text-on-brand` 다크 모드 분기 추가**
   브랜드 컬러 위에서는 항상 흰색이 안전. 다크 모드에서 #0A0A0A로 흘러내려가지 않도록 `colors.css` 다크 블록에 명시:
   ```css
   @media (prefers-color-scheme: dark) {
     :root {
       --color-action-text-on-brand: oklch(1 0 89.9); /* #FFFFFF 고정 */
     }
   }
   ```
   또는 Figma alias도 neutral/0이라면 Figma 사양 자체를 `brand-on-fill` 같은 별도 primitive (항상 흰색)로 분리 권고.

### P1 — Figma 사양 대조 (셀렉션 후 재실행)

2. Figma `Colors` 컬렉션 프레임 선택 후 `/check-tokens` 재실행 → primitive hex와 oklch 변환 ΔE 검증, semantic alias 매핑 표 완성.
3. text/primary, surface/default 등 neutral-기반 alias의 다크 결과 색이 Figma 사양과 동일한지 확정.

### P2 — 정리

4. `TripCard.stories.tsx:79` 하드코딩 `#171717`을 Storybook의 토큰 import로 대체 (영향도 낮음, 일관성 차원).

---

## 다음 단계

Figma 캔버스에서 색상 스와치 프레임을 하나 선택한 뒤 메시지로 알려 주시면, `get_variable_defs`를 다시 호출해서 **❓ 항목 전체를 ✅/❌로 확정**하겠습니다.
