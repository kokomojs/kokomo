import * as path from "path";
import ControllerLoader from "../../src/loaders/ControllerLoader";
import { ControllerStore } from "../../src/store";
import Test1Controller from "../fixtures/loaders/controllers/test.controller";
import Test2Controller from "../fixtures/loaders/controllers/test";

describe("tests/loaders/ControllerLoader.test.ts", () => {
  describe("ControllerLoader.loadControllerDir", () => {
    it("should be ok", () => {
      ControllerStore.clear();
      const basePath = path.join(__dirname, "../fixtures/loaders/controllers");
      ControllerLoader.loadControllerDir(basePath);
      const controllers = ControllerStore.values();
      expect(controllers.length).toBe(1);
    });

    it("should not be ok", () => {
      ControllerStore.clear();
      const basePath = path.join(__dirname, "../fixtures/loaders/controllers/notexists");
      ControllerLoader.loadControllerDir(basePath);
      const controllers = ControllerStore.values();
      expect(controllers.length).toBe(0);
    });
  });
  describe("ControllerLoader.loadController", () => {
    it("should be ok", () => {
      ControllerStore.clear();
      const filePath = path.join(__dirname, "../fixtures/loaders/controllers/test.controller.ts");
      ControllerLoader.loadController(filePath);
      const controller = ControllerStore.getController(Test1Controller);
      expect(controller).toBeDefined();
    });

    it("should not be ok", () => {
      ControllerStore.clear();
      const filePath = path.join(__dirname, "../fixtures/loaders/controllers/test.ts");
      ControllerLoader.loadController(filePath);
      const controller = ControllerStore.getController(Test2Controller);
      expect(controller).toBeUndefined();
    });
  });
});
