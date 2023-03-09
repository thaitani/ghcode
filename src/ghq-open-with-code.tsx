import { Action, ActionPanel, Icon, List, closeMainWindow } from "@raycast/api";
import { exec, execSync } from "child_process";
import { useEffect, useState } from "react";

type GhqRepo = {
  repName: string;
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
      const repoList = stdout.split("\n").map((line) => {
        return {
          repName: line.replace(ghqRoot, ""),
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
          key={ghq.fullPath}
          title={ghq.repName}
          subtitle={ghq.fullPath}
          actions={
            <ActionPanel>
              <Action
                title={"Open With Code"}
                icon={Icon.Code}
                onAction={() => {
                  execSync(`code ${ghq.fullPath}`);
                  closeMainWindow({ clearRootSearch: true });
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
