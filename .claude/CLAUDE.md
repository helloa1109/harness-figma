# 디자인 QA 자동화

Figma MCP + Claude Code로 디자인-코드 일치를 자동 검증한다.

규칙:
- 토큰 수정은 `src/tokens/`에서만
- 컴포넌트는 토큰만 사용 (하드코딩 금지)
- QA 리포트는 `docs/`에 저장
- 작업은 `.claude/agents/`에 위임 우선
