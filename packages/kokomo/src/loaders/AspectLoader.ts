import * as fs from "fs";
import * as path from "path";
import debugCreater from "debug";

import { AspectStore } from "../store";
import { inject, loadDir } from "../utils";

import type { KokomoAspect } from "../types";

const debug = debugCreater("kokomo:AspectLoader");
export default class AspectLoader {
  static loadAspect(filePath: string): void {
    const fileInfo = path.parse(filePath);
    const [clazzName, type, ...suffix] = fileInfo.name.split(".");

    if (suffix.length === 0 && type === "aspect") {
      const clazz: KokomoAspect = inject.default(filePath);

      debug(`[Aspect] ===> load ${clazzName}.aspect.ts`);
      AspectStore.setAspect(clazzName, clazz);
    }
  }
  static loadAspectDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      return;
    }
    loadDir(dirPath, AspectLoader.loadAspect);
  }
}
