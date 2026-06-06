---
description: Figma 디자인 시스템 컴포넌트 자동 생성 (figma-component-builder 에이전트 위임)
---

`figma-component-builder` 에이전트를 호출하여 Figma에 디자인 시스템 컴포넌트를 생성하세요.

## 사용법

\`\`\`
/build-component <컴포넌트명> [스펙 또는 Figma 노드 링크]
\`\`\`

### 예시
- `/build-component Badge` — Badge 컴포넌트 기본 스펙으로 생성
- `/build-component Switch with on/off state and size variants` — 자유 스펙
- `/build-component IconButton https://figma.com/...` — Figma 시안 참고

## 작업 절차 (에이전트가 수행)

1. 기존 컴포넌트 + 변수 조회 (중복 방지)
2. 컴포넌트 빌드 (auto-layout + 자식 노드 + 토큰 바인딩)
3. variants 생성 + Component Set 결합
4. 모든 컬러/스페이싱/라디우스/border-width에 변수 alias 바인딩
5. screenshot 시각 검증
6. 노드 ID + 토큰 매핑표 반환

## 다음 단계 (체이닝)

- `/implement-figma <노드 URL>` → React + TS 코드 구현
- `/gen-stories <ComponentName>` → Storybook 스토리 자동 생성
- `/qa` → QA 리포트로 사이클 닫기

## 인자가 부족하면

- 컴포넌트명이 없으면 사용자에게 요청
- 스펙이 모호하면 에이전트가 합리적 기본값으로 진행하되 명시
