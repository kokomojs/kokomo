import type { BaseServiceConstructor } from "../core/BaseService";

const ServiceMap: Map<string, BaseServiceConstructor> = new Map();

function setService(serviceName: string, clazz: BaseServiceConstructor): void {
  ServiceMap.set(serviceName, clazz);
}
function getService(serviceName: string): BaseServiceConstructor {
  return ServiceMap.get(serviceName)!;
}
function clear(): void {
  ServiceMap.clear();
}
export default {
  setService,
  getService,
  clear,
  store: ServiceMap,
};
