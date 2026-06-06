#!/usr/bin/env node
/**
 * PostToolUse 훅: 컴포넌트 생성/수정 후 Storybook story 파일 존재 확인
 * 없으면 경고 (block은 안 함)
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, basename, join } from "node:path";

try {
  const input = JSON.parse(readFileSync(0, "utf-8"));
  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || toolInput.path || "";

  if (!filePath.match(/src\/components\/.*\.tsx?$/)) process.exit(0);
  if (filePath.endsWith(".stories.tsx") || filePath.endsWith(".test.tsx")) process.exit(0);

  const dir = dirname(filePath);
  const name = basename(filePath).replace(/\.tsx?$/, "");
  const storyPath = join(dir, `${name}.stories.tsx`);

  if (!existsSync(storyPath)) {
    console.log(
      `⚠️ [check-story-exists] ${name}.stories.tsx 가 없습니다. /gen-story ${name} 으로 생성하세요.`
    );
  }

  process.exit(0);
} catch (err) {
  console.error(`[check-story-exists] hook error: ${err.message}`);
  process.exit(0);
}
