import { aspectHelper } from "../utils";
import { AspectNotice } from "../config";

import type { KokomoAspect } from "../types";
/**
 * @name 全部通知
 * @use @Aspect('aspect')
 */
export function Aspect(aspect: string | KokomoAspect): any {
  return aspectHelper(aspect, Object.values(AspectNotice));
}
/**
 * @name 前置通知
 * @use @Aspect.before('aspect')
 */
Aspect.before = function (aspect: string | KokomoAspect): any {
  return aspectHelper(aspect, [AspectNotice.before]);
};
/**
 * @name 后置通知
 * @use @Aspect.before('aspect')
 */
Aspect.after = function (aspect: string | KokomoAspect): any {
  return aspectHelper(aspect, [AspectNotice.after]);
};
/**
 * @name 环绕通知
 * @use @Aspect.before('aspect')
 */
Aspect.around = function (aspect: string | KokomoAspect): any {
  return aspectHelper(aspect, [AspectNotice.around]);
};
