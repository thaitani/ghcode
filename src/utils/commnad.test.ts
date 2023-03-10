import path from "path";
import { execSyncWrap } from "./command";
describe("commnad test", () => {
  describe("check command exec", () => {
    test("pwd", () => {
      expect(path.basename(execSyncWrap("pwd"))).toBe("raycast-ghq-kit\n");
    });
    test("ghq", () => {
      expect(execSyncWrap("ghq list")).not.toBeNull();
    });
  });
});
