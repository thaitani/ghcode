import {
  Action,
  ActionPanel,
  Icon,
  Image,
  List,
  Toast,
  clearSearchBar,
  closeMainWindow,
  popToRoot,
  showToast,
} from "@raycast/api";
import { exec, execSync } from "child_process";
import { useEffect, useState } from "react";

const githubIcon: Image.ImageLike = { source: { light: "github-mark.png", dark: "github-mark-white.png" } };
type GhqRepo = {
  icon: Image.ImageLike;
  subPath: string;
  fullPath: string;
};

export default function Command() {
  const [ghqList, setGhqList] = useState<GhqRepo[]>([]);
  const [query, setQuery] = useState<string>("");
  process.env.PATH = "/opt/homebrew/bin/:/opt/homebrew/sbin:/usr/gnu/bin:/usr/local/bin:/bin:/usr/bin:.";

  const fetchGhqRepos = () => {
    exec(`ghq list -p ${query}`, (err, stdout) => {
      if (err != null) {
        return;
      }
      const ghqRoot = execSync("ghq root").toString().split("\n")[0];
      const repoList = stdout
        .split("\n")
        .filter((e) => e)
        .map((line) => {
          const subPath = line.replace(`${ghqRoot}/`, "");
          const icon = subPath.startsWith("github.com") ? githubIcon : Icon.BlankDocument;
          return {
            icon,
            subPath,
            fullPath: line,
          } as GhqRepo;
        });

      setGhqList(repoList);
    });
  };

  useEffect(() => {
    fetchGhqRepos();
  }, [query]);

  return (
    <List onSearchTextChange={(query) => setQuery(query)}>
      {ghqList?.map((ghq) => (
        <List.Item
          icon={ghq.icon}
          key={ghq.fullPath}
          title={ghq.subPath}
          subtitle={ghq.fullPath}
          actions={
            <ActionPanel>
              <Action
                title={"Open With Code"}
                icon={Icon.Code}
                onAction={async () => {
                  execSync(`code ${ghq.fullPath}`);
                  await showToast({ style: Toast.Style.Success, title: "Success", message: "Open VS Code" });
                  await clearSearchBar({ forceScrollToTop: true });
                  await popToRoot({ clearSearchBar: true });
                  await closeMainWindow({ clearRootSearch: true });
                }}
              ></Action>
              <Action.ShowInFinder path={ghq.fullPath}></Action.ShowInFinder>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
