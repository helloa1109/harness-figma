# Toast QA Report — 2026-06-06

네 번째 복합 Radix 컴포넌트(`@radix-ui/react-toast@1.2.16`). 16 variants (4 variant × 2 title × 2 action).

## 요약

| 등급 | 수 |
|---|---|
| Critical | 3 |
| High | 2 |
| Medium | 4 |
| Low | 3 |

## 이슈

### Critical
**C1. 다크모드에서 success/warning/danger 50 배경이 라이트 톤 그대로 노출** (`Toast.tsx:48-59`)
- primitive `*-50`을 직접 참조 → 다크 배경(#0a0a0a) 위에 `#ecfdf5` 카드가 떠 명도 충돌
- 픽스: semantic alias `--color-feedback-surface-{success,warning,danger}` 신설 (별도 PR, 토큰 작업)

**C2. `box-shadow` 인라인 하드코딩** (`Toast.tsx:178-181`)
- DESIGN.md §4 위배. Switch와 동일 패턴 반복
- 픽스: `--shadow-overlay` 토큰 신설 (별도 PR)

**C3. swipe end 트랜스폼 누락** (`Toast.tsx:160-162`)
- swipe로 닫을 때 카드가 멈춤. `--radix-toast-swipe-end-x` 미적용
- 픽스: `data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]` + `fade-out-0` 추가 (이번 PR)

### High
**H1. `aria-live` 정책 부재 — danger/warning이 polite로 안내** (`Toast.tsx:166-197`)
- 시각장애 사용자에게 위급 알림 늦게 전달
- 픽스: danger/warning일 때 `type="foreground"` 명시 가이드 또는 코드에서 자동 설정

**H2. Action 라벨 컬러가 variant와 무관** (`Toast.stories.tsx`)
- Figma는 action을 variant 500 컬러로 표현. 별도 PR (Button tone)

### Medium
- M1. ToastProvider 사용 패턴 가이드 부재 — 앱 루트에 1개만 마운트 (스토리 주석)
- M2. swipe cancel transition vs move transition 충돌 — `data-[swipe=move]:transition-none` 추가 (이번 PR)
- M3. info 아이콘이 brand 컬러 — 시안 의도 확인
- M4. ToastClose IconButton 재사용 (별도 PR)

### Low
- L1. `useToastContext()` 호출 결과 미사용 (이번 PR 제거)
- L2. ToastViewport z-index 매직 넘버 (별도 PR)
- L3. Storybook setTimeout 트릭 — 데모 hack

## 픽스 순서
1. **C3** swipe end translate (이번 PR)
2. **H1** danger/warning role="alert" 또는 type 가이드 (이번 PR)
3. **M2** swipe move transition-none (이번 PR)
4. **L1** useContext 미사용 제거 (이번 PR)
5. C1, C2, H2, M1, M3, M4 별도 PR
