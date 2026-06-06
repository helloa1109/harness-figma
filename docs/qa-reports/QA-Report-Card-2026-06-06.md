# Card QA Report — 2026-06-06

## 1. 요약

| Severity | 개수 |
|---|---|
| Critical | 0 |
| High | 2 |
| Medium | 3 |
| Low | 2 |

18 variants 시안 매핑 일치. 다만 **interactive focus-visible 미정의**, **다크모드 elevated shadow 시인성 낮음** 2건이 핵심.

## 2. 이슈

### High
**H1. interactive 시 focus-visible 없음** (`Card.tsx:79-83`)
- 키보드 사용자 포커스 위치 인지 불가, DESIGN.md a11y 룰 위반
- 픽스: `focus-visible:outline outline-2 offset-2 outline-[var(--color-brand-500)]` 추가

**H2. 다크모드 elevated shadow 시인성 낮음** (`Card.tsx:32-35`)
- `neutral-opacity-100/200` (검정 8%/8%)이 다크 surface 위에서 안 보임
- 픽스: `--shadow-card-rest/hover` 토큰 신설 (별도 PR, DESIGN.md §8 등록)

### Medium
- M1. interactive=true + onClick 없을 때 침묵 실패 (dev warn 권장)
- M2. hover shadow를 onMouseEnter/Leave DOM mutation으로 처리 — CSS로 이동 권장
- M3. role override 동작 문서화

### Low
- L1. DarkMode 스토리에 elevated 가시성 비교 추가
- L2. 스토리 fontWeight 600 하드코딩

## 3. 픽스 순서
1. **H1** focus-visible 추가 (이번 PR)
2. H2 + 토큰 신설 (별도 PR)
3. M1~M3, L1~L2 별도 PR
