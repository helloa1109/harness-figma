# figma-token-builder 에이전트 + `/tb` 커맨드

Figma 디자인 토큰(Variables) 생성 전담 에이전트. 백그라운드에서 작업하고 결과 표만 메인 대화에 보고.

## 구조

```
[ 사용자 입력 ]
       ↓
   /tb 커맨드            ← 짧은 진입점
   (.claude/commands/tb.md)
       ↓
   figma-token-builder   ← 실제 일하는 에이전트
   (.claude/agents/figma-token-builder.md)
       ↓
   Figma MCP 도구 호출 + swatch 검증 + 결과 보고
```

## 호출 방법

```bash
/tb spacing 토큰 만들어줘 (8pt grid)              # 권장 — 가장 짧음
"피그마에 typography 토큰 만들어줘"                # 자연어 트리거
"figma-token-builder로 만들어줘"                   # 명시적 지정
```

## 사용 예시

```
/tb 컬러 brand에 950 단계 추가 (#5B1A0A)
/tb spacing 토큰 (Tailwind 8pt grid)
/tb radius 토큰 5종 (none, sm, md, lg, full)
/tb typography 토큰 — Pretendard + font-size 6단계
```

## 자동 트리거 키워드

- "토큰 만들어줘"
- "디자인 토큰 추가"
- "Figma 변수"
- "컬러 팔레트"
- "spacing 토큰"
- "디자인 시스템 구축"
- "variables 만들어"

## 권한 (최소)

| 도구 | 이유 |
|------|------|
| `mcp__figma__use_figma` | 변수 생성 (핵심) |
| `mcp__figma__get_metadata` | 기존 구조 확인 |
| `mcp__figma__get_variable_defs` | 중복 방지 |
| `mcp__figma__get_screenshot` | 시각 검증 |
| `mcp__figma__whoami` | 플랜·인증 확인 |
| `Read`, `Bash` | 코드 컨벤션 참조·디버깅 |

**일부러 안 줌**: `Write`, `Edit` — 코드는 안 건드림. 토큰 코드 동기화는 `/build-tokens` 담당.

## 에이전트가 따르는 우리 규약

| 항목 | 규약 |
|------|------|
| 컬렉션 이름 | 영문 단순 (`Colors`, `Typography`, `Spacing`, `Radius`) |
| 변수 이름 | `group/shade` (`brand/500`, `space/md`, `font-size/lg`) |
| 컬러 스케일 | Tailwind 표준 (50-900) |
| 모드 전략 | Brand 동일 / Neutral 반전 / Semantic 한 단계 밝게 |
| 스코프 | `["ALL_FILLS", "STROKE_COLOR", "EFFECT_COLOR"]` 등 정밀 지정 (ALL_SCOPES 금지) |
| 검증 | swatch 프레임 + 스크린샷 |
| 마무리 | `/build-tokens` 호출 안내 |

## 다른 에이전트와의 역할 분리

| 에이전트 | 방향 |
|----------|------|
| `figma-token-builder` (신규) | **Figma에 토큰 만들기** ← 이 문서 |
| `token-checker` | Figma ↔ 코드 토큰 동기화 확인 |
| `figma-implementer` | Figma 시안 → React 컴포넌트 코드 |
| `qa-reporter` / `design-reviewer` | 디자인 QA·감사 |

## 흔한 워크플로우

```
1. /tb <원하는 토큰 설명>        ← 새 에이전트가 Figma에 만듦
2. /build-tokens                  ← 만든 토큰을 src/tokens/*.css로 동기화
3. (필요 시) /check-tokens        ← 동기화 상태 확인
```

## 한계

- **Starter 플랜**: Variables 모드 1개만 + MCP 호출 한도 있음
- **Pretendard 등 비표준 폰트**: Figma 서버에 없으면 swatch 미리보기는 Inter로 fallback (변수 값은 정상 저장)
- **새 에이전트 등록**: 파일 만든 직후엔 `/agents` 목록에 안 보임 → Claude Code 세션 재시작 필요. `/tb` 커맨드는 즉시 작동.
