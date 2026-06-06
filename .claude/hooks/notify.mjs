#!/usr/bin/env node
/**
 * Notification 훅: Claude가 사용자 입력을 기다릴 때 알림
 * macOS: osascript / Linux: notify-send / Windows: PowerShell
 */

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { platform } from "node:os";

try {
  const input = JSON.parse(readFileSync(0, "utf-8"));
  const message = input.message || "Claude Code가 입력을 기다리고 있습니다";
  const title = "Claude Code";

  const os = platform();

  if (os === "darwin") {
    execSync(
      `osascript -e 'display notification "${message}" with title "${title}" sound name "Tink"'`
    );
  } else if (os === "linux") {
    execSync(`notify-send "${title}" "${message}"`);
  } else if (os === "win32") {
    execSync(
      `powershell -Command "New-BurntToastNotification -Text '${title}', '${message}'"`,
      { stdio: "ignore" }
    );
  }

  process.exit(0);
} catch (err) {
  // 알림 실패는 무시 (작업 흐름 방해 안 함)
  process.exit(0);
}
