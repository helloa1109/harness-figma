---
name: sync-tokens
description: Figma Variables를 CSS 변수 파일로 변환·동기화합니다. 컬러는 oklch, 스페이싱은 rem 단위로 출력합니다.
---

# sync-tokens 스킬

## 변환 규칙

| Figma 타입 | 출력 형식 | 예시 |
|------------|-----------|------|
| Color | `--color-{group}-{shade}` | `--color-brand-500: oklch(0.6 0.2 270);` |
| Number (spacing) | `--space-{name}` | `--space-md: 1rem;` |
| Number (radius) | `--radius-{name}` | `--radius-sm: 0.25rem;` |
| String (font) | `--font-{name}` | `--font-sans: "Pretendard", sans-serif;` |

## 출력 파일 구조
```
src/tokens/
├── colors.css      ← 컬러만
├── typography.css  ← 폰트 패밀리, 사이즈, 라인 높이
├── spacing.css     ← 스페이싱, 라디우스
└── index.css       ← 위 3개 import + :root 등록
```

## 주의
- 이 스킬은 `/build-tokens` 커맨드에서만 호출되어야 함
- 일반 작업 중 `src/tokens/` 수정 시도는 hook이 차단
