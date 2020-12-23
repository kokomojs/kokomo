import * as fs from "fs";
import * as path from "path";
import debugCreater from "debug";
import { ServiceStore } from "../store";
import { inject, loadDir } from "../utils";
import BaseService, { BaseServiceConstructor } from "../core/BaseService";

const debug = debugCreater("kokomo:ServiceLoader");
export default class ServiceLoader {
  static loadService(filePath: string): void {
    const fileInfo = path.parse(filePath);
    const [clazzName, type, ...suffix] = fileInfo.name.split(".");

    if (suffix.length === 0 && type === "service") {
      const clazz: BaseServiceConstructor = inject.default(filePath);

      if (clazz && clazz.prototype && clazz.prototype instanceof BaseService) {
        debug(`[Service] ===> load ${clazzName}.service.ts`);
        ServiceStore.setService(clazzName, clazz);
      }
    }
  }

  static loadServiceDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) return;

    loadDir(dirPath, ServiceLoader.loadService);
  }
}
