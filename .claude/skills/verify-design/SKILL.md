---
name: verify-design
description: 코드와 Figma 시안을 픽셀 단위로 비교합니다. Playwright로 스크린샷을 찍어 Figma 원본과 diff 분석합니다.
---

# verify-design 스킬

## 사용 흐름
1. 컴포넌트의 Storybook URL을 확인 (예: `http://localhost:6006/?path=/story/...`)
2. Playwright로 해당 스토리의 스크린샷 캡처 → `tmp/code-{component}.png`
3. Figma MCP `get_screenshot`으로 시안 캡처 → `tmp/figma-{component}.png`
4. ImageMagick `compare`로 픽셀 차이 계산
5. diff 이미지를 `docs/diff/{component}-{날짜}.png`로 저장
6. 차이율 % 와 함께 리포트

## 합격 기준
- 픽셀 차이율 < 2%: ✅ Pass
- 2% ~ 5%: ⚠️ Warning (사람 검토 필요)
- 5% 초과: ❌ Fail

## 의존성
- `npx playwright` 사용 가능 (`scripts/screenshot.mjs` 참조)
- `imagemagick` 시스템 패키지 필요

