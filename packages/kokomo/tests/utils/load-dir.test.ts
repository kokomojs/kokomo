import * as path from "path";

import { loadDir } from "../../src/utils";

describe("tests/utils/load-dir.test.ts", () => {
  describe("loadDir", () => {
    it("it should ok", () => {
      const dirPath1 = path.resolve(__dirname, "../fixtures/utils");
      loadDir(
        dirPath1,
        (filePath: string) => {
          const fileInfo = path.parse(filePath);
          if (fileInfo.name === "test") expect(fileInfo.name).toBe("test");
          if (fileInfo.name === "test1") expect(fileInfo.name).toBe("test1");
        },
        ["ignore"]
      );

      const dirPath2 = path.resolve(__dirname, "../fixtures/utils/notexists");
      loadDir(dirPath2, () => {
        // TODO
      });
    });
  });
});
