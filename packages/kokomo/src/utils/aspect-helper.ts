/* eslint-disable @typescript-eslint/ban-types */
import { AspectStore } from "../store";
import { AspectNotice } from "../config";
import type { KokomoAspect } from "../types";
import type { BaseControllerConstructor } from "../core/BaseController";

export function aspectHelper(aspect: string | KokomoAspect, notices: AspectNotice[]): any {
  const aspectClazz = AspectStore.getAspect(aspect);

  if (!aspectClazz) {
    throw new Error(`Aspect ${aspect} not found!`);
  }
  return function aspectDecorator(
    target: BaseControllerConstructor | Function,
    methodName: string,
    desc: PropertyDescriptor
  ): PropertyDescriptor | null {
    // 声明在类上
    if (!methodName) {
      Reflect.ownKeys(target.prototype).forEach(method => {
        if (method === "constructor") return;

        const aopMethodDescriptor = aspectDecorator(
          target,
          method as string,
          Reflect.getOwnPropertyDescriptor(target.prototype, method)!
        );

        Reflect.defineProperty(target.prototype, method, aopMethodDescriptor!);
      });
      return null;
    }
    const { value: method, configurable, enumerable } = desc;
    return {
      enumerable,
      configurable,
      writable: true,
      value: async function (...args: any[]) {
        // 实例化切面对象
        const aspectInstance: KokomoAspect = Reflect.construct(aspectClazz as Function, [this]);
        // 获取切面对象声明的通知方法
        const { before, after, around } = aspectInstance;
        // 封装切面对象方法参数
        const point = { args, context: this };

        // 处理前置通知
        if (notices.includes(AspectNotice.before) && before) {
          await Promise.resolve(Reflect.apply(before, aspectInstance, [point]));
        }
        const proceed = async (...proceedArgs: any[]) => {
          return Reflect.apply(method, this, proceedArgs.length ? proceedArgs : args);
        };
        let methodResult: any;
        try {
          // 处理环绕通知
          if (notices.includes(AspectNotice.around) && around) {
            const proceedPoint = { proceed, ...point };
            methodResult = await Promise.resolve(Reflect.apply(around, aspectInstance, [proceedPoint]));
          } else {
            // 执行原方法
            methodResult = await proceed(...args);
          }
        } catch (err) {
          methodResult = err;
        }
        // 处理后置通知
        if (notices.includes(AspectNotice.after) && after) {
          await Promise.resolve(Reflect.apply(after, aspectInstance, [point]));
        }

        return methodResult;
      },
    };
  };
}
