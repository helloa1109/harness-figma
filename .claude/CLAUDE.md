# 디자인 QA 자동화

Figma MCP + Claude Code로 디자인-코드 일치를 자동 검증한다.

규칙:
- **새 사이클 시작 전 `DESIGN.md`를 먼저 읽어 토큰·컴포넌트 카탈로그·컨벤션 파악** (Figma metadata 조회 비용 ↓)
- 토큰 수정은 `src/tokens/`에서만
- 컴포넌트는 토큰만 사용 (하드코딩 금지)
- QA 리포트는 `docs/qa-reports/`에 저장 (`QA-Report-{컴포넌트}-{YYYY-MM-DD}.md`)
- 작업은 `.claude/agents/`에 위임 우선
- 컴포넌트 신규/Figma node ID 변경/토큰 추가 시 `DESIGN.md` 갱신 필수
