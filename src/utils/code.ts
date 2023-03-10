import { execSyncWrap } from "./command";

const openWithCode = (path: string) => execSyncWrap(`code ${path}`);

export { openWithCode };
