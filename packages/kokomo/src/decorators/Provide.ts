import { ResourceClazzStore } from "../store";
import debugCreater from "debug";

const debug = debugCreater("kokomo:@Provide");
/**
 * 修饰 class
 * @param props 实例化参数
 */
export function Provide(...props: any[]): any {
  return function provide(target: { new (...args: any[]): any }): any {
    const resourceName = target.name;
    debug(`[@Provide] ===> find class decorator @Provide("${resourceName}")`);
    ResourceClazzStore.setResourceClazz(resourceName, target, props);
  };
}
