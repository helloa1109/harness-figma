#!/usr/bin/env node
/**
 * PreToolUse 훅: 컴포넌트 파일에 하드코딩된 값 차단
 * - 헥스 컬러 (#RGB, #RRGGBB)
 * - Tailwind 색상/사이즈 단축 클래스 (bg-red-500, text-sm 등)
 * - 픽셀 값 (16px, 24px)
 */

import { readFileSync } from "node:fs";

const PATTERNS = [
  { re: /#[0-9a-fA-F]{3,8}\b/, msg: "헥스 컬러 직접 사용 금지" },
  { re: /\b(bg|text|border|ring|from|to|via)-(red|blue|green|gray|slate|zinc|neutral|stone|orange|amber|yellow|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/, msg: "Tailwind 색상 단축 클래스 금지" },
  { re: /\b(text|leading)-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)\b/, msg: "Tailwind 사이즈 단축 클래스 금지" },
  { re: /:\s*\d+px\b/, msg: "px 단위 직접 사용 금지 (토큰 사용)" },
];

try {
  const input = JSON.parse(readFileSync(0, "utf-8"));
  const toolName = input.tool_name || "";
  const toolInput = input.tool_input || {};
  const filePath = toolInput.file_path || toolInput.path || "";

  if (!["Write", "Edit"].includes(toolName)) process.exit(0);
  if (!filePath.includes("src/components/")) process.exit(0);

  const content =
    toolInput.content ||
    toolInput.new_str ||
    toolInput.file_text ||
    "";

  for (const { re, msg } of PATTERNS) {
    const match = content.match(re);
    if (match) {
      console.error(
        JSON.stringify({
          decision: "block",
          reason: `🎨 ${msg}\n발견: "${match[0]}"\n→ src/tokens/의 CSS 변수를 사용하세요. 예: var(--color-brand-500)`,
        })
      );
      process.exit(2);
    }
  }

  process.exit(0);
} catch (err) {
  console.error(`[detect-hardcoded-colors] hook error: ${err.message}`);
  process.exit(0);
}
