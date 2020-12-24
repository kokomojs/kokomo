import * as path from "path";
import debugCreater from "debug";

import { inject, isArray } from "../utils";
import Kokomo from "../core/Kokomo";
import { ConfigStore } from "../store";

const debug = debugCreater("kokomo:MiddlewareLoader");
export default class MiddlewareLoader {
  static loadMiddlewares(dirPath: string): void {
    const kokomo = Kokomo.instance();
    // 启动 config 中配置的 plugin
    const currentConfig = ConfigStore.getConfig(kokomo.env);
    const { middlewares } = currentConfig;
    if (!middlewares) return;
    for (const mw of middlewares) {
      const { path: mwPath, pkg, options } = mw;
      if (mwPath) {
        const fn = inject.default(path.resolve(dirPath, mwPath));
        const middleware = fn(options, kokomo.app);
        kokomo.use(middleware);
        debug(`[MiddlewareLoader] ===> Use internal middleware: %s with options: %j`, mwPath, options || {});
      }
      if (pkg) {
        const fn = inject.default(pkg);
        const middleware = isArray(options) ? fn(...options) : fn(options);
        kokomo.use(middleware);
        debug(`[MiddlewareLoader] ===> Use external middleware: %s with options: %j`, pkg, options || {});
      }
    }
  }
}
