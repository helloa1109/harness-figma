# Wireframe QA Report — Welcome / Login

- 날짜: 2026-06-07
- 대상 페이지: Wireframes (`224:2`)
- 검증 frame
  - Welcome `225:2` (375×812, 좌표 0,0)
  - Login `227:8` (375×812, 좌표 575,0)
- Figma 파일: https://www.figma.com/design/B138LEBl3Li7yNGdSpIuq6/
- 도구: `get_metadata`, `get_design_context`, `get_screenshot`
- 기준: `.claude/agents/wireframe-reviewer.md`, `DESIGN.md`

---

## 1. 요약 표

| 등급 | Welcome | Login | 합계 |
|---|---|---|---|
| Critical | 0 | 0 | 0 |
| High | 0 | 2 | 2 |
| Medium | 2 | 3 | 5 |
| Low | 2 | 3 | 5 |
| Pass | 11 | 9 | 20 |

총평: **두 화면 모두 Critical 없음**. Welcome은 거의 통과, Login은 시각 위계(CTA 다중) · 보조 액션(비밀번호 찾기) · spacing 일관성에서 개선 여지.

---

## 2. Screenshot

- Welcome: https://www.figma.com/api/mcp/asset/9651c70e-8f6d-453f-83e6-93967b6c5c40
- Login: https://www.figma.com/api/mcp/asset/496074d2-7267-47c9-b769-c83357193624

(7일 만료. 영구 보관 필요 시 `curl -o welcome.png "<URL>"`로 다운로드)

---

## 3. 항목별 검증

### Critical

| 항목 | Welcome | Login | 비고 |
|---|---|---|---|
| 레이아웃 깨짐 없음 | Pass | Pass | 모든 child가 frame 내부, instance fill 정상 |
| 텍스트 line-height PERCENT | Pass | Pass | leading `1.2`/`1.5` decimal multiplier로 표기 — Figma상 PERCENT(120/150) 바인딩 추정. variable 직접 바인딩은 X |
| SafeArea (top ~44 / bottom ~34) | Pass | Pass | Welcome: pt 120 / pb 34. Login: pt 32 + Header 32(아이콘 14off) / pb 34 |
| 자식 frame 내 위치 | Pass | Pass | overflow 없음 |

### High

| 항목 | Welcome | Login | 픽스 노트 |
|---|---|---|---|
| CTA 1개 명확 (primary 1) | Pass | **High** | Login에 Primary 1 + Secondary 2 + Ghost 1 = 액션 4개. Primary 단일은 충족하나 Secondary 2개(카카오/Apple)가 시각적으로 동등 무게 → 위계 흐림. 한 화면 정책 정하기(예: Secondary 통합 또는 social=outline+icon으로 격하) |
| 1화면 1메시지 | Pass | Pass | Welcome 헤드라인+서브 1세트, Login 제목+서브 1세트 |
| 시각 우선순위 | Pass | **High** | Login 본문 진입(이메일/비번/로그인)과 소셜 로그인이 동일 width·height로 줄세움 → 첫 진입자에게 "어디로 가야 하나" 결정 비용. 소셜 블록 위에 divider("또는") 또는 size/color 격하 권장 |
| IconButton aria-label | Pass | Pass | Login Header IconButton 이름 `close`로 의도 명시. Code 단계에서 `aria-label="닫기"` 강제 필요 |

### Medium

| 항목 | Welcome | Login | 픽스 노트 |
|---|---|---|---|
| instance variant 적절성 | Pass | Pass | Welcome: Primary lg + Ghost md(보조), Login: TextField lg / Button lg — 시안 컨텍스트 모두 맞음 |
| 자식 간격 토큰 사용 | **Medium** (spacer-grow flex) | **Medium** (spacer 4px) | Welcome: `spacer-grow`는 flex 컨테이너에서 OK. Login: `227:63` spacer 4px — xs 토큰이지만 카카오/Apple 사이만 4px이고 다른 spacer는 8/16/32 → spacer scale 일관성 검토 필요 (8로 통일 권장) |
| 카피 톤 | Pass | Pass | Welcome 헤드라인 "다음 여행이 더 쉬워져요" 짧고 친근. Login "이메일과 비밀번호를 입력하세요" 명확. 토스/카카오 톤 통과 |
| 외부 컴포넌트 X | Pass | Pass | 모두 내부 컴포넌트(Button/TextField/Checkbox/IconButton) instance |
| 보조 액션 결손 | — | **Medium** | "비밀번호 찾기" 또는 "이메일 찾기" 링크가 없음. 일반 로그인 UX 표준. Checkbox row 우측 정렬로 ghost xs 텍스트 링크 권장 |
| 헤더 영역 spacing 과다 | — | **Medium** | Login: Header(60) + spacer(32) + Title row(38) + spacer(8) + subcopy(21) + spacer(32) = 191px. 모바일 viewport 23% 차지. xl→md(16)로 압축 검토 |

### Low

| 항목 | Welcome | Login | 비고 |
|---|---|---|---|
| 다크모드 | **Low** | **Low** | Frame은 light만 검증. Storybook decorator로 다크모드 별도 확인 필요 (DESIGN.md 미해결 4번 항목) |
| 빈 공간 시각 균형 | Pass | **Low** | Login 마지막 y=669, frame 812 → 하단 109px 공백. flex column이라 채워지지만 의도된 여백인지 명시 필요 |
| 일러스트/placeholder 명시 | **Low** | — | Welcome ✈ 이모지 자리표시. 디자이너 자산 대기 메모 명시 권장(`Illustration` frame name + Notes) |
| 소셜 로그인 아이콘 | — | **Low** | 카카오/Apple 텍스트만, 아이콘 부재. Icon 라이브러리 미구축 (알려진 한계) |

### Pass 카운트 상세

- Welcome (11): 레이아웃, line-height, SafeArea, overflow, CTA 명확, 1메시지, 위계, aria, variant, 카피톤, 외부컴포넌트X
- Login (9): 레이아웃, line-height, SafeArea, overflow, 1메시지, aria, variant, 카피톤, 외부컴포넌트X

---

## 4. 픽스 우선순위

| # | 픽스 | 화면 | 등급 | 액션 |
|---|---|---|---|---|
| 1 | 소셜 로그인 블록 시각 격하 (divider + size 다운 or outline-icon variant) | Login | High | 시각 위계 회복 — Primary 로그인이 1차 진입임을 명확히 |
| 2 | "비밀번호 찾기" 텍스트 링크 추가 (Checkbox row 우측) | Login | High | 표준 UX 누락 보완 |
| 3 | 카카오↔Apple 간 spacer 4 → 8로 통일 | Login | Medium | spacing 토큰 일관성 |
| 4 | Title 영역 spacer 32→16 압축 | Login | Medium | 모바일 viewport 효율화 |
| 5 | Welcome `Illustration` frame에 placeholder 메모 명시 | Welcome | Low | 디자이너 핸드오프 마찰 감소 |
| 6 | 다크모드 별도 검증 (Storybook decorator) | 둘 다 | Low | DESIGN.md 미해결 4 |

---

## 5. 다음 와이어프레임에 적용할 학습 포인트

1. **spacer 토큰 화이트리스트 명문화** — 컨테이너 내 spacer는 `xs(4)/sm(8)/md(16)/xl(32)` 중 하나만. 카카오↔Apple 4px처럼 "근거 없는 단발성 스페이싱" 발생 방지를 위해 wireframe-reviewer 체크리스트 Medium에 추가.
2. **다중 보조 액션 결정 규칙** — 한 화면에 Primary 1 + Secondary 2개 이상 등장 시 자동 High 플래그. 시안 단계에서 divider("또는 다음으로 계속") + 소셜은 outline-icon variant로 격하하는 패턴을 디폴트로 정착(토스 로그인 / 카카오 로그인 표준).
