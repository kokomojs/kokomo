import * as fs from "fs";
import * as path from "path";
import debugCreater from "debug";

import { ConfigStore } from "../store";
import { inject, loadDir } from "../utils";

import type { KokomoConfig } from "../types";

const debug = debugCreater("kokomo:ConfigLoader");
export default class ConfigLoader {
  static loadConfig(filePath: string): void {
    const fileInfo = path.parse(filePath);
    const [type, configName, ...suffix] = fileInfo.name.split(".");

    if (suffix.length === 0 && type === "config") {
      const fileConfig: KokomoConfig = inject.default(filePath);

      debug(`[ConfigLoader] ===> load config.${configName}.ts`);
      ConfigStore.setConfig(configName, fileConfig);
    }
  }
  static loadConfigDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) return;

    loadDir(dirPath, ConfigLoader.loadConfig);
  }
}
