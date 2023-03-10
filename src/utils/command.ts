import { execSync } from "child_process";

export const execSyncWrap = (command: string): string => {
  try {
    return execSync(command, {
      env: { ...process.env, PATH: "/opt/homebrew/bin/:/usr/bin:/bin" },
    }).toString();
  } catch (e) {
    throw new Error(`command failed: ${command}`);
  }
};
