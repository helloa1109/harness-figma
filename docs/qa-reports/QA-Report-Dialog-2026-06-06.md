# Dialog QA Report — 2026-06-06

세 번째 복합 Radix 컴포넌트(`@radix-ui/react-dialog@1.1.16`). 9 variants (3 variant × 3 size).

## 요약

| 등급 | 수 |
|---|---|
| Critical | 0 |
| High | 3 |
| Medium | 4 |
| Low | 3 |

## 이슈

### High
**H1. Close X 버튼이 기본 비노출** (`Dialog.tsx` Content)
- Figma 9 variants **모두 우상단 X**. 코드는 `DialogClose showIconButton` 명시 호출 필요 → 시안 mismatch
- 픽스: DialogContent에 X 기본 렌더 + `hideCloseButton` 옵션

**H2. content `focus:outline-none` — 키보드 진입 시각 피드백 없음** (`Dialog.tsx:83`)
- Radix가 content focus 강제. outline 끄면 진입 인지 불가
- 픽스: focus-visible outline 추가 (다른 컴포넌트 패턴 동일)

**H3. Title icon size 24px 하드코딩, size별 스케일 미고려** (`Dialog.tsx:149-201`)
- 별도 PR

### Medium
- M1. 인라인 `<style>` keyframes vs Toast의 `tailwindcss-animate` 패턴 불일치 — 통일 필요 (별도 PR)
- M2. box-shadow 인라인 — `--shadow-dialog` 토큰 신설 (별도 PR)
- M3. Destructive 아이콘 시안 vector 재확인
- M4. sm width 시안 비교 후 조정 검토

### Low
- L1. DialogTrigger asChild 가이드 추가
- L2. iconLabel 기본값 한국어 하드코딩 — i18n 후속
- L3. Description default 노출 (a11y warning 회피용)

## 픽스 순서
1. **H1** X 기본 렌더 (이번 PR)
2. **H2** focus-visible outline (이번 PR)
3. H3, M1, M2, M3, M4, L1~L3 별도 PR
