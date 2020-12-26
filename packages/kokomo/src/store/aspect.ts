import type { KokomoAspect } from "../types";

const AspectMap: Map<string | KokomoAspect, KokomoAspect> = new Map();

function setAspect(AspectName: string | KokomoAspect, AspectClazz: KokomoAspect): void {
  AspectMap.set(AspectName, AspectClazz);
}
function getAspect(AspectName: string | KokomoAspect): KokomoAspect {
  return AspectMap.get(AspectName)!;
}
function clear(): void {
  AspectMap.clear();
}
export default {
  store: AspectMap,
  setAspect,
  getAspect,
  clear,
};
