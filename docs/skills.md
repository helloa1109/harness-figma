# Skills (스킬)

## 스킬이란?

스킬은 **대화창 내에서 직접 상호작용하며 작업을 수행하는 절차서**입니다. 마크다운으로 작성된 "이렇게 일해라" 매뉴얼.

## Agent vs Skill 다시 보기

같은 자동화 도구처럼 보이지만, 결정적 차이가 있습니다.

| 항목 | Agent | Skill |
|------|-------|-------|
| **실행 위치** | 백그라운드 | 메인 대화창 |
| **작업 노출** | 결과만 보임 | 모든 단계가 대화에 나옴 |
| **컨텍스트 사용** | 적음 | 많음 |
| **디버깅 용이성** | 어려움 (블랙박스) | 쉬움 (눈에 다 보임) |
| **자동 위임** | `description` 매칭으로 자동 | 호출자(보통 커맨드)가 명시 |
| **적합한 작업** | 큰 작업, 반복 작업, 결과만 중요한 작업 | 정교한 작업, 사람이 확인하며 진행할 작업 |

### 언제 Agent? 언제 Skill?

- **Agent로 만들기**: "QA 전체 검사" 처럼 큰 작업. 결과 리포트만 중요하고 중간 과정은 안 봐도 됨
- **Skill로 만들기**: "토큰 한 줄 수정" 처럼 사용자가 한 단계씩 확인하며 진행하고 싶은 작업

## 파일 형식

`.claude/skills/{name}/SKILL.md` (폴더 안에 SKILL.md):

```yaml
---
name: skill-name
description: 이 스킬이 무엇을 하는지 한 문장 설명
---

# 본문: 단계별 절차, 출력 형식, 주의사항
```

스킬은 **폴더 단위**로 관리됩니다. 폴더 안에 SKILL.md 외에도:
- 예시 파일 (`example.tsx`)
- 보조 스크립트 (`helper.mjs`)
- 템플릿 (`template.md`)
등을 함께 넣을 수 있습니다.

## 이 템플릿의 스킬 3종

### 1. `gen-stories` — Storybook 스토리 자동 생성

| 항목 | 내용 |
|------|------|
| 폴더 | `.claude/skills/gen-stories/` |
| 입력 | 컴포넌트 `.tsx` 파일 |
| 출력 | 동일 폴더에 `.stories.tsx` |
| 호출자 | `/gen-story <컴포넌트>` 커맨드 또는 자연어 |

**작업 절차**
1. 대상 컴포넌트의 `interface Props` 추출
2. props 타입 기반으로 Storybook v8 형식 스토리 생성
3. variants가 enum이면 모든 값에 대해 별도 스토리 자동 추가

**왜 스킬인가?**  
스토리 생성은 빠르고 단순하지만, props 타입에 따라 결과를 사용자가 즉시 확인하고 미세 조정하는 게 유용해서 대화창 노출이 도움됨.

---

### 2. `sync-tokens` — Figma Variables → CSS 변수 변환

| 항목 | 내용 |
|------|------|
| 폴더 | `.claude/skills/sync-tokens/` |
| 입력 | Figma `get_variable_defs` 결과 |
| 출력 | `src/tokens/{colors,typography,spacing,index}.css` |
| 호출자 | `/build-tokens` 커맨드 전용 |

**변환 규칙**

| Figma 타입 | CSS 변수 형식 | 예시 |
|-----------|--------------|------|
| Color | `--color-{group}-{shade}` | `--color-brand-500: oklch(...)` |
| Number (spacing) | `--space-{name}` | `--space-md: 1rem` |
| Number (radius) | `--radius-{name}` | `--radius-sm: 0.25rem` |
| String (font) | `--font-{name}` | `--font-sans: ...` |

**왜 스킬인가?**  
토큰 변환은 사용자가 결과를 검토할 필요가 큰 작업. 잘못 변환되면 디자인 시스템이 망가지므로 모든 매핑을 대화창에 노출해 확인받는 게 안전.

⚠️ 이 스킬은 `/build-tokens` 커맨드에서만 호출. 일반 작업 중에는 `src/tokens/` 쓰기 권한이 차단되어 있음.

---

### 3. `verify-design` — 픽셀 단위 시각 비교

| 항목 | 내용 |
|------|------|
| 폴더 | `.claude/skills/verify-design/` |
| 입력 | Storybook URL + Figma 노드 |
| 출력 | `docs/diff/{component}-{날짜}.png` + 차이율 |
| 호출자 | `qa-reporter` 에이전트 내부 호출 |

**작업 흐름**
1. Playwright로 Storybook 컴포넌트 스크린샷
2. Figma MCP `get_screenshot` 으로 시안 스크린샷
3. ImageMagick `compare` 로 픽셀 diff 계산
4. diff 이미지 저장 + 차이율 % 보고

**합격 기준**
- < 2%: ✅ Pass
- 2~5%: ⚠️ Warning (사람 검토 필요)
- > 5%: ❌ Fail

**의존성**
- `npx playwright`
- `imagemagick` (시스템 패키지)

## 새 스킬 추가하는 법

1. `.claude/skills/{my-skill}/` 폴더 생성
2. 그 안에 `SKILL.md` 작성
3. YAML 프론트매터의 `name`, `description` 명시
4. 본문은 **번호 순서의 절차서**로 작성 (1단계 → 2단계 → ...)
5. 출력 형식, 합격/실패 기준, 의존성을 명시
6. 보조 파일(예시, 스크립트)이 필요하면 같은 폴더에 함께 배치

## 호출 관계 정리

```
사용자 입력
   │
   ├─ /커맨드 ────► [.claude/commands/x.md] ──┐
   │                                          ├─► [.claude/agents/y.md] 위임
   │                                          │       │
   │                                          │       └─► [.claude/skills/z/SKILL.md] 호출
   │                                          │
   └─ 자연어 ─────────────────────────────────┘ (description 매칭)
```

- **커맨드**는 입구
- **에이전트**는 큰 작업 단위
- **스킬**은 에이전트나 사용자가 호출하는 세부 절차

## 핵심 차이를 다시 한 줄로

> **에이전트는 "누가" — 일하는 사람.**  
> **스킬은 "어떻게" — 일하는 매뉴얼.**  
> **커맨드는 "시작 버튼" — 일을 시키는 단축키.**
