import { Icon, Image } from "@raycast/api";
import { execSyncWrap } from "./command";
export type GhqRepo = {
  icon: Image.ImageLike;
  subPath: string;
  fullPath: string;
};
const fetchGhqList = (query: string): GhqRepo[] => {
  const githubIcon: Image.ImageLike = { source: { light: "github-mark.png", dark: "github-mark-white.png" } };
  return execSyncWrap(`ghq list -p ${query}`)
    .split("\n")
    .filter((e) => e)
    .map((line) => {
      const subPath = line.replace(`${ghqRoot()}/`, "");
      const icon = subPath.startsWith("github.com") ? githubIcon : Icon.BlankDocument;
      return {
        icon,
        subPath,
        fullPath: line,
      } as GhqRepo;
    });
};

const ghqRoot = () => execSyncWrap("ghq root").toString().split("\n")[0];

export { fetchGhqList };
