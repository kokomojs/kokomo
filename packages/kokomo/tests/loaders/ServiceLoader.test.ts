import * as path from "path";
import ServiceLoader from "../../src/loaders/ServiceLoader";
import { ServiceStore } from "../../src/store";

describe("tests/loaders/ServiceLoader.test.ts", () => {
  describe("ServiceLoader.loadControllerDir", () => {
    it("should be ok", () => {
      ServiceStore.clear();
      const basePath1 = path.join(__dirname, "../fixtures/loaders/services");
      ServiceLoader.loadServiceDir(basePath1);
      const services1 = Array.from(ServiceStore.store.entries());
      expect(services1.length).toBe(1);
    });

    it("should not be ok", () => {
      ServiceStore.clear();
      const basePath = path.join(__dirname, "../fixtures/loaders/services/notexists");
      ServiceLoader.loadServiceDir(basePath);
      const services = Array.from(ServiceStore.store.entries());
      expect(services.length).toBe(0);
    });
  });
  describe("ServiceLoader.loadController", () => {
    it("should be ok", () => {
      ServiceStore.clear();
      const filePath = path.join(__dirname, "../fixtures/loaders/services/test.service.ts");
      ServiceLoader.loadService(filePath);
      const service = ServiceStore.getService("test");
      expect(service).toBeDefined();
    });

    it("should not be ok", () => {
      ServiceStore.clear();
      const filePath = path.join(__dirname, "../fixtures/loaders/services/test.ts");
      ServiceLoader.loadService(filePath);
      const service = ServiceStore.getService("test");
      expect(service).toBeUndefined();
    });
  });
});
