import { execSync } from "child_process";

const execSyncWrap = (command: string): string => {
  try {
    return execSync(command, {
      env: { ...process.env, PATH: "/opt/homebrew/bin/:/usr/bin:/bin" },
    }).toString();
  } catch (e) {
    throw new Error(`command failed: ${command}`);
  }
};

export { execSyncWrap };
