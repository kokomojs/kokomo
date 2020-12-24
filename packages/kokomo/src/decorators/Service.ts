import debugCreater from "debug";
import { ServiceStore } from "../store";
import { isString, isUndefined } from "../utils";
import BaseController from "../core/BaseController";
import BaseService from "../core/BaseService";
import type { BaseServiceConstructor } from "../core/BaseService";

const debug = debugCreater("kokomo:@Service");
/**
 * @service 注入 service
 */
export function Service(service: string | BaseServiceConstructor): any {
  return (target: BaseController, property: string, desc: PropertyDescriptor): PropertyDescriptor => {
    const serviceName = isString(service) ? service : service.name;
    if (!(target instanceof BaseController) || !isUndefined(desc)) {
      throw new Error(
        `Please check @Service(${serviceName})/${property} used on Controller's property, and Controller extends BaseController.`
      );
    }
    debug(`[@Service] ===> find property decorator @Service("${serviceName}")`);
    return {
      get(this: BaseController): BaseService {
        const serviceClass = isString(service) ? ServiceStore.getService(service) : service;

        if (!serviceClass) throw new Error(`Please check ${service}.service.ts is exists and extends BaseService.`);
        // 实例化 Service
        return Reflect.construct(serviceClass, [this.ctx]);
      },
      configurable: false,
    };
  };
}
