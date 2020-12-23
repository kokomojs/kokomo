import * as fs from "fs";
import * as path from "path";
import debugCreater from "debug";
import { inject, loadDir } from "../utils";
import { ControllerStore } from "../store";
import BaseController from "../core/BaseController";

const debug = debugCreater("kokomo:ControllerLoader");
export default class ControllerLoader {
  static loadController(filePath: string): void {
    const fileInfo = path.parse(filePath);
    const [clazzName, type, ...suffix] = fileInfo.name.split(".");
    if (suffix.length === 0 && type === "controller") {
      const clazz = inject.default(filePath);

      if (clazz && clazz.prototype && clazz.prototype instanceof BaseController) {
        debug(`[Controller] ===> load ${clazzName}.controller.ts`);
        ControllerStore.setController(clazz, null, { clazzName });
      }
    }
  }
  static loadControllerDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      console.warn(`controller file path is not exists, path:${dirPath}`);

      return;
    }
    loadDir(dirPath, ControllerLoader.loadController);
  }
}
