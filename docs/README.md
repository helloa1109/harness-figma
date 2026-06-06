# docs/

## 📚 문서 가이드 (먼저 이걸 읽으세요)

| 파일 | 내용 |
|------|------|
| [`docs.md`](./docs.md) | **프로젝트 전반 개요** — 왜 만들었나, 아키텍처, 워크플로우 |
| [`agents.md`](./agents.md) | 에이전트 4종 상세 — qa-reporter, figma-implementer, design-reviewer, token-checker |
| [`commands.md`](./commands.md) | 단축 명령어 5종 — /qa, /build-tokens, /check-tokens, /design-audit, /implement-figma |
| [`skills.md`](./skills.md) | 스킬 3종 — gen-stories, sync-tokens, verify-design |

## 🤖 자동 생성되는 파일

- `QA-Report-YYYY-MM-DD.md` ← `qa-reporter` 에이전트
- `design-review-YYYY-MM-DD.md` ← `design-reviewer` 에이전트
- `diff/{component}-YYYY-MM-DD.png` ← `verify-design` 스킬

## ✏️ 수동 작성 권장

- `decisions/` 하위에 디자인 결정 기록 (ADR 형식 권장)
