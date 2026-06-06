#!/usr/bin/env node
/**
 * PreToolUse 훅: src/tokens/ 파일 직접 수정 차단
 * 토큰은 /build-tokens 커맨드를 통해서만 수정 가능
 */

import { readFileSync, existsSync } from "node:fs";

// /build-tokens 커맨드 우회: sentinel 파일이 존재하면 모든 차단 통과
// 명시적으로 토큰 빌드 실행 중일 때만 활성화됨
if (existsSync(".claude/.build-tokens-active")) {
  process.exit(0);
}

const PROTECTED_PATHS = [
  "src/tokens/",
  ".claude/agents/",
  ".claude/hooks/",
  ".claude/settings.json",
];

try {
  const input = JSON.parse(readFileSync(0, "utf-8"));
  const toolName = input.tool_name || "";
  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || toolInput.path || "";

  if (!["Write", "Edit"].includes(toolName)) {
    process.exit(0);
  }

  for (const protectedPath of PROTECTED_PATHS) {
    if (filePath.includes(protectedPath)) {
      console.error(
        JSON.stringify({
          decision: "block",
          reason: `🚫 보호된 경로 (${protectedPath})는 직접 수정할 수 없습니다. ` +
            `토큰은 /build-tokens 커맨드, 하네스는 사용자가 수동으로 수정하세요.`,
        })
      );
      process.exit(2);
    }
  }

  process.exit(0);
} catch (err) {
  console.error(`[protect-files] hook error: ${err.message}`);
  process.exit(0);
}
