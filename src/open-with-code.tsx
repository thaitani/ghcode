import { Action, ActionPanel, Icon, List, closeMainWindow, popToRoot } from "@raycast/api";
import { useMemo, useState } from "react";
import { ghqList } from "./utils/ghq";
import { openWithCode } from "./utils/code";

export default function Command() {
  const [query, setQuery] = useState<string>("");

  const _ghqList = useMemo(() => ghqList(query), [query]);
  return (
    <List onSearchTextChange={setQuery} isShowingDetail>
      {_ghqList.map((ghq) => (
        <List.Item
          icon={ghq.icon}
          key={ghq.fullPath}
          title={ghq.subPath}
          detail={<List.Item.Detail markdown={ghq.readme} />}
          actions={
            <ActionPanel>
              <Action
                title={"Open With Code"}
                icon={Icon.Code}
                onAction={async () => {
                  openWithCode(ghq.fullPath);
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
