import { execSync } from "child_process";

const execSyncWrap = (command: string): string => {
  try {
    return execSync(command, {
      env: {
        HOME: "/Users/toshiki",
        PATH: "/opt/homebrew/bin/:/usr/gnu/bin:/usr/local/bin:/bin:/usr/bin:.",
      },
    }).toString();
  } catch (e) {
    console.log(e);
    throw new Error(`command failed: ${command}`);
  }
};

export { execSyncWrap };
