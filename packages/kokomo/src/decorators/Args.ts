import { ControllerStore } from "../store";
import debugCreater from "debug";

import type { KokomoContext } from "../types";
/**
 * @description 自定义参数装饰器
 * @param {Function} fn
 */
export function createArgDecorator(fn: (ctx: KokomoContext, ...argProps: any[]) => any) {
  return function (...argProps: any[]): ParameterDecorator {
    return function argDecorator(target: any, propertyKey: string | symbol, argIndex: number) {
      if (target.constructor) {
        ControllerStore.setController(target.constructor, propertyKey, {
          argDecorator: fn,
          argProps,
          argIndex,
        });
      }
    };
  };
}
/**
 * @description param 装饰器
 */
export const Param = createArgDecorator((ctx: KokomoContext, argKey) => {
  const debug = debugCreater("kokomo:@Param");
  debug(`[@Param] ===> find parameter decorator @Param("${argKey}")`);
  return ctx.params[argKey];
});

/**
 * @description query 装饰器
 */
export const Query = createArgDecorator((ctx: KokomoContext, argKey) => {
  const debug = debugCreater("kokomo:@Query");
  debug(`[@Query] ===> find parameter decorator @Query("${argKey}")`);
  return ctx.query[argKey];
});

/**
 * @description context 装饰器
 */
export const Context = createArgDecorator((ctx: KokomoContext) => {
  const debug = debugCreater("kokomo:@Query");
  debug(`[@Context] ===> find parameter decorator @Context()`);
  return ctx;
});
