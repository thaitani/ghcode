import { Icon, Image } from "@raycast/api";
import { execSyncWrap } from "./command";
import { readReadme } from "./readme";
export type GhqRepo = {
  icon: Image.ImageLike;
  subPath: string;
  fullPath: string;
  readme: string;
};
export const ghqList = (query: string): GhqRepo[] => {
  const githubIcon: Image.ImageLike = { source: { light: "github-mark.png", dark: "github-mark-white.png" } };
  return execSyncWrap(`ghq list -p ${query}`)
    .split("\n")
    .filter((e) => e)
    .map((line) => {
      const subPath = line.replace(`${ghqRoot()}/`, "");
      const icon = subPath.startsWith("github.com") ? githubIcon : Icon.BlankDocument;
      return {
        icon,
        subPath: subPath.replace("github.com/", ""),
        fullPath: line,
        readme: readReadme(line),
      } as GhqRepo;
    });
};

export const ghqGet = (url: string) => execSyncWrap(`ghq get ${url}`);

const ghqRoot = () => execSyncWrap("ghq root").toString().split("\n")[0];
