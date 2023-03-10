import { execSyncWrap } from "./command";

export const openWithCode = (path: string) => execSyncWrap(`code ${path}`);
