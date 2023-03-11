import { Toast, showToast } from "@raycast/api";
import { execSyncWrap } from "./command";

export const openWithCode = (path: string) => {
  try {
    execSyncWrap(`code ${path}`);
  } catch (e) {
    if (e instanceof Error) {
      showToast({ title: e.name, style: Toast.Style.Failure, message: e.message });
    } else {
      showToast({ title: "Unknown Error", style: Toast.Style.Failure });
    }
  }
};
