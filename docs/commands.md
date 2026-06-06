# Commands (커맨드)

## 커맨드란?

커맨드는 **`/명령어` 형태로 호출하는 단축 명령어**입니다.

### 왜 필요한가

자연어로 에이전트나 스킬을 호출하면 가끔 실패합니다:
- 사용자: "QA 좀 돌려줘" → 의도는 명확하지만 모델이 다른 작업을 시작할 수 있음
- 사용자: "/qa" → 명확하고 강제적으로 `qa-reporter` 에이전트 호출

커맨드는 **자연어 호출의 실패율을 0으로 만드는 강제 호출 단축어**입니다.

## 파일 형식

`.claude/commands/{name}.md` 에 YAML 프론트매터 + 본문:

```yaml
---
description: 한 줄 설명 (커맨드 목록에 표시됨)
---

(이 커맨드가 실행할 작업의 지시문)
```

### 사용 방법

Claude Code 대화창에서:
```
/qa https://figma.com/file/xxx
```

이 입력은 다음과 동등:
> "qa.md 커맨드 파일을 읽고, 그 안의 지시대로 정확히 수행하라. 인자는 https://figma.com/file/xxx 다."

## 이 템플릿의 커맨드 5종

### 1. `/qa` — 전체 디자인 QA 리포트 생성

```
/qa <Figma URL> [컴포넌트 경로]
```

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/commands/qa.md` |
| 호출 대상 | `qa-reporter` 에이전트 |
| 출력 | `docs/QA-Report-{오늘 날짜}.md` |
| 권장 사용 시점 | 릴리즈 전 필수, PR 머지 전 |

---

### 2. `/build-tokens` — Figma Variables → CSS 변수 빌드

```
/build-tokens <Figma 토큰 페이지 URL>
```

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/commands/build-tokens.md` |
| 호출 대상 | `sync-tokens` 스킬 |
| 출력 | `src/tokens/{colors,typography,spacing,index}.css` |
| 권장 사용 시점 | 디자이너가 토큰 변경 후 |

⚠️ `src/tokens/`는 평시에는 `deny` 권한으로 잠겨 있음. **이 커맨드를 명시적으로 호출했을 때만** 수정 가능.

---

### 3. `/check-tokens` — 토큰 동기화 상태 점검

```
/check-tokens [Figma URL]
```

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/commands/check-tokens.md` |
| 호출 대상 | `token-checker` 에이전트 |
| 출력 | 대화창에 비교표 |
| 권장 사용 시점 | 토큰 빌드 후 검증, 정기 점검 |

`/build-tokens` 가 **수정**한다면, `/check-tokens` 는 **확인만** 한다.

---

### 4. `/design-audit` — 디자인 품질 감사

```
/design-audit [경로]
```

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/commands/design-audit.md` |
| 호출 대상 | `design-reviewer` 에이전트 |
| 출력 | `docs/design-review-{오늘 날짜}.md` |
| 권장 사용 시점 | 신규 컴포넌트 추가 후, 분기별 정기 감사 |

기본값은 `src/components/ui/` 전체. 경로 인자가 있으면 해당 경로만 검사.

---

### 5. `/implement-figma` — Figma 링크로 컴포넌트 자동 구현

```
/implement-figma <Figma 노드 링크> [컴포넌트명]
```

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/commands/implement-figma.md` |
| 호출 대상 | `figma-implementer` 에이전트 |
| 출력 | `src/components/ui/{Name}.tsx` + `.css` |
| 권장 사용 시점 | 새 컴포넌트 작업 시작 시 |

컴포넌트명을 안 주면 Figma 메타데이터에서 자동 추출.

## 권장 사용 순서

```
디자인 변경 → /build-tokens → /check-tokens → /implement-figma → /qa → /design-audit
                  ↓               ↓                ↓              ↓          ↓
              토큰 갱신       정합성 확인      컴포넌트 생성    일치 검증   품질 감사
```

## 새 커맨드 추가하는 법

1. `.claude/commands/{my-cmd}.md` 파일 생성
2. YAML 프론트매터의 `description` 작성 (한 줄)
3. 본문에 작업 지시문 작성. 보통 특정 에이전트나 스킬을 호출하도록 안내
4. 인자가 필요하면 사용법 명시 (예: `사용법: /my-cmd <url>`)
5. Claude Code 대화창에서 `/my-cmd` 로 호출 가능

## 커맨드 vs 에이전트 vs 스킬 호출 비교

같은 작업을 세 가지 방법으로 시작할 수 있다:

| 방법 | 입력 예시 | 안정성 | 권장 상황 |
|------|----------|--------|----------|
| 자연어 | "QA 좀 돌려줘 https://figma.com/..." | 보통 | 가벼운 작업, 탐색 단계 |
| 커맨드 | `/qa https://figma.com/...` | 높음 | 반복 작업, 자동화 |
| 에이전트 직접 지정 | "qa-reporter 에이전트로 검사해" | 매우 높음 | 디버깅, 명시성 필요 시 |

**일반 사용은 커맨드를 추천**합니다. 자연어보다 안정적이고, 에이전트 이름을 외울 필요 없어 편합니다.
