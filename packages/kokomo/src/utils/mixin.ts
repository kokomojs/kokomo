import { isObject } from "./lang";

/**
 * 混入目标，暂不考虑 Map & Set
 * @param target 目标
 * @param source 资源
 */
export function mixin(deep = false, target: any, ...sources: any[]): any {
  if (!isObject(target)) return target;

  for (const source of sources) {
    if (!isObject(source)) continue;

    const keys = Reflect.ownKeys(source);

    for (const key of keys) {
      const descriptor = Reflect.getOwnPropertyDescriptor(source, key);
      const { get, set, value } = descriptor!;

      if (get || set) {
        const desc: PropertyDescriptor = { configurable: true };

        if (get) desc.get = get;
        if (set) desc.set = set;

        Reflect.defineProperty(target, key, desc);
      } else if (Reflect.has(descriptor as any, "value")) {
        Reflect.set(target, key, deep && isObject(value) ? mixin(true, Reflect.get(target, key) || {}, value) : value);
      }
    }
  }

  return target;
}
