# 디자인 QA 자동화 하네스 템플릿

Figma MCP + Claude Code로 디자인-코드 일치 검증을 자동화하는 프로젝트 템플릿입니다.

## 폴더 구조

```
.
├── .claude/
│   ├── CLAUDE.md              # 1순위 가이드 (최대 200자)
│   ├── settings.json          # 권한 + 훅 설정
│   ├── agents/                # 백그라운드 작업자
│   │   ├── qa-reporter.md
│   │   ├── figma-implementer.md
│   │   ├── design-reviewer.md
│   │   └── token-checker.md
│   ├── commands/              # 단축 명령어 (/qa 등)
│   │   ├── qa.md
│   │   ├── build-tokens.md
│   │   ├── check-tokens.md
│   │   ├── design-audit.md
│   │   └── implement-figma.md
│   ├── hooks/                 # 작업 개입 스크립트
│   │   ├── protect-files.mjs
│   │   ├── detect-hardcoded-colors.mjs
│   │   ├── check-story-exists.mjs
│   │   └── notify.mjs
│   └── skills/                # 대화창에서 직접 실행되는 스킬
│       ├── gen-stories/SKILL.md
│       ├── sync-tokens/SKILL.md
│       └── verify-design/SKILL.md
├── docs/                      # 리포트 저장
├── scripts/                   # CI/유틸 스크립트
└── src/
    ├── tokens/                # 디자인 토큰 (직접 수정 금지)
    │   ├── colors.css
    │   ├── typography.css
    │   ├── spacing.css
    │   └── index.css
    └── components/ui/         # 컴포넌트 구현
        └── Button.tsx
```

## 시작하기

### 1. 사전 준비
- Figma 유료 요금제 (MCP 서버 접근용)
- Claude 유료 요금제
- Node.js 20+
- VS Code 또는 Cursor IDE + Claude Code 확장

### 2. Figma MCP 인증
터미널에서 Claude Code 실행 후:
```
/mcp
```
관리 메뉴에서 Figma 서버 인증 진행.

### 3. 프로젝트 초기화
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss@latest
```

### 4. 워크플로우

| 단계 | 명령 | 담당 |
|------|------|------|
| 토큰 빌드 | `/build-tokens <Figma 토큰 URL>` | sync-tokens 스킬 |
| 컴포넌트 구현 | `/implement-figma <노드 URL>` | figma-implementer |
| 토큰 검사 | `/check-tokens` | token-checker |
| 디자인 감사 | `/design-audit` | design-reviewer |
| 전체 QA | `/qa <Figma URL>` | qa-reporter |

## 핵심 원칙

1. **토큰은 단일 진실 원천** — `src/tokens/`만 디자인 값을 정의. 컴포넌트는 토큰만 참조.
2. **하드코딩 차단** — 훅이 자동으로 헥스 색상/px 단위/Tailwind 단축 클래스를 거부.
3. **에이전트 우선 위임** — 큰 작업은 컨텍스트 절약을 위해 에이전트에 위임.
4. **검증 가능한 자동화** — 모든 QA 결과는 `docs/`에 마크다운으로 저장되어 PR 리뷰 가능.

## 커스터마이징

- 새 에이전트 추가: `.claude/agents/{name}.md` (YAML 프론트매터 필수)
- 새 훅 추가: `.claude/hooks/{name}.mjs` + `settings.json`의 `hooks`에 등록
- 보호 경로 추가: `settings.json`의 `permissions.deny`에 글롭 패턴 추가
