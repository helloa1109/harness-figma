---
description: Figma Variables를 src/tokens/ CSS 변수로 자동 빌드 (sentinel 자동 관리 + 5분 타임아웃)
---

다음 절차를 **순서대로** 수행하세요:

1. **sentinel 생성** (필수 첫 단계)
   ```bash
   touch .claude/.build-tokens-active
   ```
   → 이후 5분 이내에만 토큰 파일 쓰기 허용됨.

2. 사용자에게 Figma 토큰 페이지 URL을 요청 (이미 제공됐으면 생략).

3. `mcp__figma__get_variable_defs`로 변수 전체를 가져옵니다.
   - nodeId는 변수가 바인딩된 노드(예: swatch 프레임) 또는 페이지 ID.

4. 받은 데이터를 **oklch 형식**으로 변환하여 `src/tokens/`에 작성:
   - `colors.css` — `--color-*` (oklch 형식, 원본 hex는 주석)
   - `typography.css` — `--font-*`
   - `spacing.css` — `--space-*`, `--radius-*`
   - `index.css` — 위 3개 import + 전역 base

5. **sentinel 제거 (필수, 에러가 나도 반드시)**
   ```bash
   node -e "require('fs').unlinkSync('.claude/.build-tokens-active')"
   ```

6. 변경된 토큰 목록을 표로 보고합니다.

## ⚠️ 안전장치

- **5번은 절대 빠뜨리지 말 것.** 작업 도중 에러가 발생해도 반드시 sentinel을 제거해야 보호가 즉시 복구됩니다.

- 빠뜨려도 훅이 **5분 후 자동 무효화**하므로 장기적 보호 구멍은 생기지 않습니다.
- sentinel이 존재하는 동안에는 누구나(에이전트·도구) `src/tokens/`에 쓸 수 있으므로, 그 시간을 최소화하세요.

## 동작 원리

이 커맨드는 평소 잠겨있는 `src/tokens/`에 쓸 수 있는 유일한 통로입니다.

```
[ /build-tokens 호출 ]
        ↓
  touch sentinel (5분 타이머 시작)
        ↓
  get_variable_defs → JSON 응답
        ↓
  hex → oklch 변환
        ↓
  Write src/tokens/*.css (sentinel 덕에 hook 통과)
        ↓
  remove sentinel (보호 복구)
        ↓
  보고
```
