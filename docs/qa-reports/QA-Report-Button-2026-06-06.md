# Button QA Report — 2026-06-06

## 1. 요약

| Severity | 개수 |
|---|---|
| Critical | 1 |
| High | 3 |
| Medium | 3 |
| Low | 2 |

36 variants 시안과 매핑 일치. 하지만 **loading 시 children/icon이 같이 노출되어 폭 점프**, **primary가 semantic action 토큰 우회**가 결정적.

## 2. 이슈

### Critical
**C1. Loading 시 children/icon이 사라지지 않아 폭 늘어남** (`Button.tsx:151-178`)
- 픽스: loading 중 children/icon 숨김(`opacity-0` + absolute spinner) 또는 조건부 렌더

### High
**H1. Primary가 semantic `action-bg-*` 우회, primitive `brand-500/600/700` 직접 참조** (`Button.tsx:54-59`)
- IconButton과 일관성 깨짐, 다크모드 회귀 위험
- 픽스: `action-bg-default/hover/pressed`로 교체

**H2. Secondary/Ghost hover/active가 primitive `neutral-100/200/300` 참조** (`Button.tsx:65-66, 71-72`)
- 다크모드에서 가시성 회귀 위험
- 픽스: `surface-subtle/muted` 또는 `neutral-opacity-*` 활용

**H3. Focus-ring 하드코딩** — DESIGN.md §8 추적 중 (별도 PR)

### Medium
- M1. `aria-disabled` 추가
- M2. disabled hover 무력화 유지 (현재 OK)
- M3. Storybook DarkMode 패턴 통일

### Low
- L1. 스토리 인라인 스타일
- L2. children required (의도된 설계, IconButton 분리)

## 3. 픽스 순서
1. **C1** loading 폭 점프 (이번 PR)
2. **H1** primary semantic 토큰 마이그레이션 (이번 PR)
3. **H2** secondary/ghost hover 토큰 정리 (이번 PR)
4. **M1** aria-disabled (이번 PR)
5. H3, M3 별도 PR
