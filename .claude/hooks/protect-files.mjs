#!/usr/bin/env node
/**
 * PreToolUse 훅: 보호된 경로 직접 수정 차단
 *
 * 보호 경로:
 *   - src/tokens/              ← /build-tokens 커맨드로만 수정 가능 (sentinel 우회 허용)
 *   - .claude/agents/          ← 사용자 수동 수정만
 *   - .claude/hooks/           ← 사용자 수동 수정만
 *   - .claude/settings.json    ← 사용자 수동 수정만
 *
 * sentinel(.claude/.build-tokens-active)이 5분 이내에 만들어졌으면
 * src/tokens/ 쓰기만 허용. 다른 보호 경로는 sentinel과 무관하게 항상 차단.
 */

import { readFileSync, existsSync, statSync } from "node:fs";

const PROTECTED_PATHS = [
  "src/tokens/",
  ".claude/agents/",
  ".claude/hooks/",
  ".claude/settings.json",
];

// sentinel로 우회 가능한 경로 — /build-tokens 전용
const SENTINEL_BYPASS_PATHS = new Set(["src/tokens/"]);

const SENTINEL_FILE = ".claude/.build-tokens-active";
const SENTINEL_TTL_MS = 5 * 60 * 1000;

function sentinelFresh() {
  if (!existsSync(SENTINEL_FILE)) return false;
  const ageMs = Date.now() - statSync(SENTINEL_FILE).mtimeMs;
  return ageMs < SENTINEL_TTL_MS;
}

try {
  const input = JSON.parse(readFileSync(0, "utf-8"));
  const toolName = input.tool_name || "";
  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || toolInput.path || "";

  if (!["Write", "Edit"].includes(toolName)) {
    process.exit(0);
  }

  for (const protectedPath of PROTECTED_PATHS) {
    if (!filePath.includes(protectedPath)) continue;

    // sentinel이 신선하고, 이 경로가 sentinel 우회 허용 목록에 있으면 통과
    if (SENTINEL_BYPASS_PATHS.has(protectedPath) && sentinelFresh()) {
      process.exit(0);
    }

    console.error(
      JSON.stringify({
        decision: "block",
        reason:
          `🚫 보호된 경로 (${protectedPath})는 직접 수정할 수 없습니다. ` +
          `토큰은 /build-tokens 커맨드, 하네스는 사용자가 수동으로 수정하세요.`,
      })
    );
    process.exit(2);
  }

  process.exit(0);
} catch (err) {
  console.error(`[protect-files] hook error: ${err.message}`);
  process.exit(0);
}
