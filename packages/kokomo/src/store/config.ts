import type { KokomoConfig } from "../types";
const ConfigMap = new Map<string, KokomoConfig>();

function setConfig(configName: string, config: KokomoConfig): void {
  ConfigMap.set(configName, config);
}

function getConfig(configName: string): KokomoConfig {
  return ConfigMap.get(configName)!;
}
function clear(): void {
  ConfigMap.clear();
}
export default {
  store: ConfigMap,
  setConfig,
  getConfig,
  clear,
};
