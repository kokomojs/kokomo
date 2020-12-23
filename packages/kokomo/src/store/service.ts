import type { BaseServiceConstructor } from "../core/BaseService";

export const ServiceMap: Map<string, BaseServiceConstructor> = new Map();

function setService(serviceName: string, clazz: BaseServiceConstructor): void {
  ServiceMap.set(serviceName, clazz);
}
function getService(serviceName: string): BaseServiceConstructor {
  return ServiceMap.get(serviceName)!;
}

export default {
  setService,
  getService,
};
