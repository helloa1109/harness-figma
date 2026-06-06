# Avatar QA Report — 2026-06-06

## 1. 요약

| Severity | 개수 |
|---|---|
| Critical | 0 |
| High | 2 |
| Medium | 4 |
| Low | 3 |

72 variants 시안과 100% 매핑. 다만 **role="img" + <img alt> 이중 발화**가 결정적.

## 2. 이슈

### High
**H1. `role="img"` 부모 + `<img>` 내부 → 스크린리더 이중 발화** (`Avatar.tsx:120-135`)
- image variant일 때 부모/내부 둘 다 라벨링 → NVDA/JAWS에서 두 번 읽힘
- 픽스: image variant일 때 부모 role/aria-label 제거하고 `<img alt={alt}>` 일원화

**H2. `alt={alt ?? ""}` 빈 문자열 — H1 픽스 후 라벨 소실 위험** (`Avatar.tsx:131`)
- 픽스: image variant일 때 `alt={alt ?? initials ?? "avatar"}`

### Medium
- M1. fontPx 하드코딩 (9/10/12/14/18/24) — 토큰 매핑 또는 시안 명시 필요
- M2. iconPx 하드코딩 — 60% 비율 통일 또는 시안 명시
- M3. status dot 위치 ring 절반이 모서리 밖 (의도 확인)
- M4. DarkMode 스토리에 image variant 누락

### Low
- L1. `align-middle` 클래스 무의미 (inline-flex)
- L2. `<span aria-hidden>{initials}</span>` 중복 가림
- L3. 다크모드 `brand-100` 배경 튐 — semantic 토큰 별도 PR

## 3. 픽스 순서
1. **H1/H2** image variant role/alt 일원화 (이번 PR)
2. **L1** align-middle 제거 (이번 PR)
3. **M4** DarkMode 스토리에 image 추가 (이번 PR)
4. M1~M3, L2~L3 별도 PR
