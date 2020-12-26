import * as path from "path";
import ConfigLoader from "../../src/loaders/ConfigLoader";
import { ConfigStore } from "../../src/store";

describe("tests/loaders/ConfigLoader.test.ts", () => {
  describe("ConfigLoader.loadConfigDir", () => {
    it("should be ok", () => {
      ConfigStore.clear();
      const basePath1 = path.join(__dirname, "../fixtures/loaders/config");
      ConfigLoader.loadConfigDir(basePath1);
      const configs1 = Array.from(ConfigStore.store);
      expect(configs1.length).toBe(1);
    });

    it("should not be ok", () => {
      ConfigStore.clear();
      const basePath = path.join(__dirname, "../fixtures/loaders/config/notexists");
      ConfigLoader.loadConfigDir(basePath);
      const configs = Array.from(ConfigStore.store);
      expect(configs.length).toBe(0);
    });
  });
  describe("ConfigLoader.loadConfig", () => {
    it("should be ok", () => {
      ConfigStore.clear();
      const filePath = path.join(__dirname, "../fixtures/loaders/config/dev.config.ts");
      ConfigLoader.loadConfig(filePath);
      const config = ConfigStore.getConfig("dev");
      expect(config).toBeDefined();
    });

    it("should not be ok", () => {
      ConfigStore.clear();
      const filePath = path.join(__dirname, "../fixtures/loaders/config/config.ts");
      ConfigLoader.loadConfig(filePath);
      const config1 = ConfigStore.getConfig("config");
      expect(config1).toBeUndefined();
    });
  });
});
