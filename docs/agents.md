# Agents (에이전트)

## 에이전트란?

에이전트는 **부여된 역할에 따라 백그라운드에서 작업을 수행하고 결과만 대화창에 보고**하는 전문 작업자입니다.

### 왜 에이전트를 쓰나

- **컨텍스트(대화 토큰) 절약**: 큰 작업의 중간 과정은 백그라운드에서 처리되어 메인 대화창의 토큰을 거의 차지하지 않음
- **AI 성능 유지**: 대화가 길어져도 앞 내용을 잊지 않음
- **역할 분리**: "QA만 한다", "Figma 구현만 한다" 처럼 책임이 명확해 결과 품질 향상

### Skill과의 차이

| 항목 | Agent | Skill |
|------|-------|-------|
| 실행 위치 | 백그라운드 | 대화창 안 |
| 컨텍스트 사용 | 적음 (결과만) | 많음 (전 과정 노출) |
| 투명성 | 낮음 (블랙박스) | 높음 (모든 작업 보임) |
| 적합한 작업 | 큰 작업, 반복 작업 | 짧고 디버깅이 필요한 작업 |

## 파일 형식

`.claude/agents/{name}.md` 에 YAML 프론트매터 + 시스템 프롬프트로 작성:

```yaml
---
name: agent-name
description: "이 에이전트가 언제 자동 위임되는지 설명. 트리거 키워드 포함."
tools: Read, Write, Edit, Bash, mcp__plugin_figma_figma__get_screenshot
model: inherit
memory: project
---

(시스템 프롬프트: 에이전트가 따라야 할 작업 절차)
```

| 필드 | 설명 |
|------|------|
| `name` | 에이전트 식별자 (파일명과 일치 권장) |
| `description` | **자동 위임 트리거**. 사용자 메시지가 이 설명과 매칭되면 자동 호출됨 |
| `tools` | 이 에이전트가 사용할 수 있는 도구 목록. 보안상 최소 권한 부여 |
| `model` | `inherit` 권장 (메인 모델 동일하게 사용) |
| `memory` | `project` 면 프로젝트 단위 메모리 사용 |

## 이 템플릿의 에이전트 4종

### 1. `qa-reporter` — 전체 QA 리포트 생성

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/agents/qa-reporter.md` |
| 트리거 | "QA 돌려줘", "QA 리포트", "전체 검사", "품질 확인", "릴리즈 전 검사" |
| 출력 | `docs/QA-Report-{날짜}.md` |
| Figma MCP 사용 | ✅ `get_design_context`, `get_variable_defs`, `get_screenshot` |

**작업 흐름 (5단계)**
1. Figma 원본 데이터 수집
2. 코드 스캔 (`src/components/ui/`)
3. 항목별 비교 분석 (컬러, 타이포, 스페이싱, 라디우스, 그림자)
4. 마크다운 리포트 작성
5. 사용자에게 요약 보고

**판정 기준**: Pass / Warning / Fail 3단계

---

### 2. `figma-implementer` — Figma 시안을 코드로

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/agents/figma-implementer.md` |
| 트리거 | "피그마 구현해줘", "컴포넌트 만들어줘", "Figma 링크로 코드" |
| 출력 | `src/components/ui/{ComponentName}.tsx` + `.css` |
| Figma MCP 사용 | ✅ `get_design_context`, `get_variable_defs` |

**작업 원칙**
- 큰 컴포넌트는 작은 단위(칩, 버튼, 아이콘)로 쪼개서 만든 뒤 조합 → 정확도 향상
- 색상/스페이싱/라디우스는 무조건 토큰 변수 사용
- TypeScript `Props` 인터페이스 명시
- 접근성(`aria-*`, semantic HTML) 준수

---

### 3. `design-reviewer` — 디자인 품질 감사

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/agents/design-reviewer.md` |
| 트리거 | "디자인 리뷰", "접근성 검사", "디자인 감사" |
| 출력 | `docs/design-review-{날짜}.md` |
| Figma MCP 사용 | ✅ `get_screenshot` |

**검사 항목**
- **접근성**: WCAG AA 색상 대비, 키보드 포커스, aria 속성, semantic HTML
- **시각 일관성**: 같은 역할 컴포넌트의 패턴 통일, 8pt grid 준수
- **토큰 준수**: 하드코딩 잔존 여부, 미사용/중복 토큰

`qa-reporter`가 코드↔디자인 일치를 본다면, `design-reviewer`는 **디자인 자체의 품질**을 본다.

---

### 4. `token-checker` — 토큰 정합성 검사

| 항목 | 내용 |
|------|------|
| 파일 | `.claude/agents/token-checker.md` |
| 트리거 | "토큰 검사", "토큰 동기화 확인" |
| 출력 | 대화창에 표 형식 (파일 저장 없음) |
| Figma MCP 사용 | ✅ `get_variable_defs` |

**검출 항목**
- Figma에만 있는 토큰 (코드 누락)
- 코드에만 있는 토큰 (Figma 누락 또는 deprecated 후보)
- 값이 다른 토큰 (불일치)

⚠️ **토큰 파일을 직접 수정하지 않는다.** 보고만 한다. 수정은 사용자가 `/build-tokens` 커맨드로 명시적으로 실행.

## 새 에이전트 추가하는 법

1. `.claude/agents/{my-agent}.md` 파일 생성
2. YAML 프론트매터 작성 (위 형식 참조)
3. `description`에 자동 위임을 원하는 **트리거 키워드**를 한국어로 풍부하게 포함
4. 시스템 프롬프트에 **작업 절차를 번호 순서로** 명시 (1단계, 2단계, ...)
5. 사용할 `tools`만 최소 권한으로 명시
6. 테스트: 트리거 키워드가 포함된 문장을 Claude Code에 입력 → 자동 위임 확인

## 자주 묻는 질문

**Q. 트리거 키워드는 정확히 일치해야 하나요?**  
A. 아니요. Claude가 사용자 메시지의 의미와 `description`을 비교해 판단합니다. 유사 표현도 잡힙니다.

**Q. 에이전트끼리 협업할 수 있나요?**  
A. 네, 한 에이전트의 시스템 프롬프트 안에서 다른 에이전트를 호출하도록 안내하면 됩니다. 단, 무한 루프 주의.

**Q. 에이전트가 토큰 파일을 수정하려고 하면?**  
A. `settings.json`의 `deny` 권한과 `protect-files.mjs` 훅이 차단합니다. 안전합니다.
