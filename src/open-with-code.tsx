import {
  Action,
  ActionPanel,
  Icon,
  List,
  Toast,
  clearSearchBar,
  closeMainWindow,
  popToRoot,
  showToast,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { GhqRepo, fetchGhqList } from "./ghq";
import { openWithCode } from "./code";

export default function Command() {
  const [ghqList, setGhqList] = useState<GhqRepo[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setGhqList(fetchGhqList(query));
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
                  openWithCode(ghq.fullPath);
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
