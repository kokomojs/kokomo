import * as path from "path";
import * as fs from "fs";
import debugCreater from "debug";

import { couldBeClass, inject } from "../utils";
import Kokomo from "../core/Kokomo";
import { ConfigStore } from "../store";

const debug = debugCreater("kokomo:PluginLoader");
export default class PluginLoader {
  static loadPlugins(dirPath: string): void {
    const kokomo = Kokomo.instance();
    // 启动 config 中配置的 plugin
    const currentConfig = ConfigStore.getConfig(kokomo.env);
    const { plugins } = currentConfig;
    if (!plugins) return;
    for (const plugin of plugins) {
      const { path: pluginPath, name } = plugin;
      const result = PluginLoader.loadPlugin(path.resolve(dirPath, pluginPath));

      if (Reflect.has(kokomo.context.plugins, name)) {
        console.log(`The kokomo instance has ${name} property !`);
        continue;
      }
      debug(`[PluginLoader] ===> load plugin: %s.ts`, name);
      Reflect.defineProperty(kokomo.context.plugins, name, {
        value: result,
        writable: true,
        enumerable: true,
        configurable: false,
      });
    }
  }

  static loadPlugin(filepath: string): void {
    if (!fs.existsSync(filepath)) return;
    const pluginFuncOrClass = inject.default(filepath);
    if (couldBeClass(pluginFuncOrClass)) {
      return Reflect.construct(pluginFuncOrClass, []);
    }
    return pluginFuncOrClass;
  }
}
