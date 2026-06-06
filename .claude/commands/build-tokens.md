---
description: Figma Variables를 src/tokens/ CSS 변수로 빌드
---

다음 절차를 수행하세요:

1. 사용자에게 Figma 토큰 페이지의 링크를 요청합니다 (이미 제공되었다면 생략).
2. `mcp__plugin_figma_figma__get_variable_defs`를 호출하여 전체 변수를 가져옵니다.
3. 다음 파일들을 `src/tokens/`에 작성합니다:
   - `colors.css` — 컬러 토큰 (`--color-*`)
   - `typography.css` — 폰트 사이즈, 라인 높이 (`--font-*`)
   - `spacing.css` — 스페이싱 / 라디우스 (`--space-*`, `--radius-*`)
   - `index.css` — 위 3개 import + 전역 base
4. 빌드 후 변경된 토큰 목록을 표로 보고합니다.

⚠️ 토큰 파일은 settings.json의 `deny` 권한 때문에 일반 작업에서는 수정 불가합니다. 이 커맨드는 명시적으로 호출될 때만 실행됩니다.
