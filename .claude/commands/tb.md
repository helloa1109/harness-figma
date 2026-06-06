---
description: figma-token-builder 에이전트 호출 — Figma에 디자인 토큰(Variables) 생성
---

다음 작업을 `figma-token-builder` 에이전트에 위임하세요:

{{인자}}

지시 사항:
1. 에이전트는 백그라운드에서 figma-use 가이드를 로드하고 use_figma로 작업합니다.
2. 작업이 끝나면 에이전트가 반환한 결과(만든 변수 목록 + 시각 검증)를 사용자에게 표 형식으로 보고하세요.
3. 다음 단계 제안으로 `/build-tokens` 호출을 명확히 안내하세요.

## 사용 예시

```
/tb 컬러 brand에 950 단계 추가 (#5B1A0A)
/tb spacing 토큰 만들어줘 (Tailwind 8pt grid)
/tb radius 토큰 5종 (none, sm, md, lg, full)
/tb typography 토큰 — Pretendard 폰트 패밀리 + font-size 6단계
```

## 인자가 없으면

사용자에게 다음 중 하나로 답하라고 요청:
- 작업할 토큰 종류 (color, spacing, radius, typography)
- 기존 컬렉션에 추가 vs 새 컬렉션 만들기
- multi-mode 필요 여부 (Light/Dark)
