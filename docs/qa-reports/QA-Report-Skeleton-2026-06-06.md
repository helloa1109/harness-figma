# QA Report — Skeleton

- 날짜: 2026-06-06
- 범위: `src/components/Skeleton/{Skeleton.tsx,index.ts,Skeleton.stories.tsx}`
- Figma: Component Set `148:56`, Documentation `151:333`
- 라인업: Tier 2 첫 번째 (자체 구현, Radix 미사용)
- 변종: 27 = 3 variant × 3 size × 3 animation

## 1. 요약

| 등급 | 건수 |
|------|------|
| Critical | 1 |
| High | 2 |
| Medium | 3 |
| Low | 3 |
| Pass | 27 매트릭스 + 토큰 매핑 |

치수/모양/배경색은 시안과 1:1. 그러나 **a11y 패턴 충돌**(`role="status"`와 `aria-hidden="true"` 동시 부여로 "Loading"이 SR에 전달 안 됨)과 **wave gradient의 다크모드 반전**이 결정적.

## 2. 항목별 상세

### 2.1 치수 (Figma ↔ 코드)

| 항목 | Figma | 코드 | 판정 |
|---|---|---|---|
| text sm/md/lg height | 12/16/20 | `h-[12/16/20px] w-full` | Pass |
| circular sm/md/lg | 32/48/64 | `size-[32/48/64px]` | Pass |
| rect sm/md/lg | 60×40 / 100×60 / 200×120 | `h-[40/60/120px] w-[60/100/200px]` | Pass |

### 2.2 색/라디우스

| 항목 | Figma | 코드 | 판정 |
|---|---|---|---|
| 배경색 | `semantic/surface/muted #f5f5f5` | `var(--color-surface-muted)` | Pass |
| text radius | `radius/xs 2` | `var(--radius-xs)` | Pass |
| rect radius | `radius/sm 4` | `var(--radius-sm)` | Pass |
| circular radius | `radius/full 9999` | `var(--radius-full)` | Pass |
| wave highlight | `neutral/0 #ffffff` | `color-mix(in oklch, var(--color-neutral-0) 60%, transparent)` | **High** — 다크에서 neutral-0이 `#0A0A0A`로 반전 |

### 2.3 토큰 준수

| 위치 | 값 | 판정 |
|---|---|---|
| `Skeleton.tsx:67` | `bg-[var(--color-surface-muted)]` | Pass |
| `Skeleton.tsx:14-18` | radius 토큰 | Pass |
| `Skeleton.tsx:70` | `animate-pulse` (Tailwind 기본) | Warning |
| `Skeleton.tsx:94` | `var(--motion-easing-standard)` | Pass |
| `Skeleton.tsx:94` | `1.6s` 하드코딩 | Warning — `--motion-duration-loop-*` 토큰 누락 |
| `Skeleton.tsx:21-36` | px 직접 (시안 명시값) | Pass (DESIGN.md §4 예외) |

### 2.4 a11y

| 항목 | 현재 | 판정 |
|---|---|---|
| `role="status"` | Yes (`:79`) | Pass |
| `aria-hidden="true"` | Yes (`:80`) | **Critical** — `role="status"` 영역을 SR이 전혀 못 읽음 |
| sr-only "Loading" | Yes (`:99`) | Pass(패턴) / 위로 인해 무력화 |
| `prefers-reduced-motion` | 없음 | Medium |

### 2.5 Animation

| 항목 | 현재 | 판정 |
|---|---|---|
| pulse | Tailwind `animate-pulse` (2s ease-in-out infinite, opacity 100↔50) | Pass |
| wave | `translateX(-100% → 200%)`, 1.6s | Pass(구현) / 색 문제는 §2.2 |
| none | 클래스 없음 | Pass |
| keyframe 주입 | `<style>` 인라인 | Medium — N개 인스턴스 = N개 `<style>` |

### 2.6 다크모드

- 배경 `--color-surface-muted` → `#262626` 자동 상속 OK
- wave gradient `--color-neutral-0` → `#0A0A0A`로 반전 → 어두운 얼룩 (의도와 반대)

### 2.7 Badge 패턴 일관성

| 항목 | Badge | Skeleton | 판정 |
|---|---|---|---|
| forwardRef + displayName | ✓ | ✓ | Pass |
| 클래스 join 패턴 | ✓ | ✓ | Pass |
| `Omit<..., "style">` | ✓ | ✗ | Low |

## 3. 등급별 결함 (픽스 우선순위)

### Critical

**C1. `aria-hidden="true"`가 `role="status"`를 무력화 (`Skeleton.tsx:80`)**
- 루트의 `aria-hidden` 제거 → 루트는 `role="status" aria-busy="true"` 유지
- 장식용 wave 오버레이 span에만 `aria-hidden` 유지
- sr-only "Loading"이 그제서야 SR에 도달

### High

**H1. wave gradient 다크모드 반전 (`Skeleton.tsx:91-92`)**
- `var(--color-neutral-0)` → `white` 고정으로 변경하거나
- 별도 토큰 `--color-skeleton-wave-highlight`(light: white/0.6, dark: white/0.18) 신설 (DESIGN.md §2 "누락 토큰" 등록)

**H2. wave keyframe을 매 인스턴스마다 `<style>` 주입 (`Skeleton.tsx:86`)**
- `@keyframes skeleton-wave`를 `src/styles.css`로 이동, 컴포넌트의 `<style>` 블록 제거
- DOM 노이즈/hydration 비용 해소

### Medium

**M2. wave duration 토큰 누락 (`Skeleton.tsx:94`)**
- 현재 `1.6s` 하드코딩. `--motion-duration-slow` = 320ms로는 부족
- `--motion-duration-loop-slow: 1600ms` 신설 후보 (별도 PR, DESIGN.md §2 등록)

**M3. `prefers-reduced-motion` 미대응**
- 미디어쿼리로 `animate-pulse`/wave animation을 `none` 처리

### Low

**L1. props 타입 `Omit<..., "style">` 누락 (`Skeleton.tsx:8`)** — Badge 패턴 정렬

**L2. RealWorldExamples 통합 스토리 누락 (`Skeleton.stories.tsx:78-119`)** — DESIGN.md §4 필수 구성

**L3. DarkMode 스토리 background에 `var(--color-neutral-900)` 사용 (`Skeleton.stories.tsx:133`)** — 다른 시드와 동일 패턴 (의도)

## 4. 픽스 순서

1. **C1** — 루트 `aria-hidden` 제거, wave 오버레이에만 유지
2. **H1** — wave gradient `white` 고정
3. **H2** — keyframe을 글로벌 css로 이전 (별도 PR 후보)
4. **M3** — `prefers-reduced-motion` 미디어쿼리 추가
5. **L1** — props 타입 정렬
6. **M2** — `--motion-duration-loop-slow` 토큰 신설 (별도 PR)

## 5. 미해결 후속 (DESIGN.md §2 누락 토큰에 등록 필요)

- `--motion-duration-loop-slow` (~1600ms)
- `--color-skeleton-wave-highlight` (light: white/0.6, dark: white/0.18) — 또는 wave를 white 고정으로 통일
