import type { KokomoAspect } from "../types";

export const AspectMap: Map<string | KokomoAspect, KokomoAspect> = new Map();

function setAspect(AspectName: string | KokomoAspect, AspectClazz: KokomoAspect): void {
  AspectMap.set(AspectName, AspectClazz);
}
function getAspect(AspectName: string | KokomoAspect): KokomoAspect {
  return AspectMap.get(AspectName)!;
}

export default {
  setAspect,
  getAspect,
};
