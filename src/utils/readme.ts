import { existsSync, readFileSync } from "fs";
import { join } from "path";

/// GitHub のREADME読み込み順に準拠
/// https://docs.github.com/ja/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
export const readReadme = (dirPath: string): string => {
  const targetFileName = "README.md";
  const targets = [
    join(dirPath, ".github", targetFileName),
    join(dirPath, targetFileName),
    join(dirPath, "docs", targetFileName),
  ];
  for (const target of targets) {
    if (existsSync(target)) {
      return readFileSync(target).toString();
    }
  }
  return "";
};
