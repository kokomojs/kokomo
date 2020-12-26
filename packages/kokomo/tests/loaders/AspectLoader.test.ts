import * as path from "path";
import { AspectStore } from "../../src/store";
import AspectLoader from "../../src/loaders/AspectLoader";

describe("tests/loaders/AspectLoader.test.ts", () => {
  describe("AspectLoader.loadAspectDir", () => {
    it("should be ok", () => {
      AspectStore.clear();
      const basePath = path.join(__dirname, "../fixtures/loaders/aspects");
      AspectLoader.loadAspectDir(basePath);
      const aspects = Array.from(AspectStore.store.entries());
      expect(aspects.length).toBe(1);
    });

    it("should not be ok", () => {
      AspectStore.clear();
      const basePath = path.join(__dirname, "../fixtures/loaders/aspects/notexists");
      AspectLoader.loadAspectDir(basePath);
      const aspects = Array.from(AspectStore.store.entries());
      expect(aspects.length).toBe(0);
    });
  });
  describe("AspectLoader.loadAspect", () => {
    it("should be ok", () => {
      AspectStore.clear();
      const filePath = path.join(__dirname, "../fixtures/loaders/aspects/test.aspect.ts");
      AspectLoader.loadAspect(filePath);
      const aspect = AspectStore.getAspect("test");
      expect(aspect).toBeDefined();
    });

    it("should not be ok", () => {
      AspectStore.clear();
      const filePath = path.join(__dirname, "../fixtures/loaders/aspects/test.ts");
      AspectLoader.loadAspect(filePath);
      const aspect = AspectStore.getAspect("test");
      expect(aspect).toBeUndefined();
    });
  });
});
