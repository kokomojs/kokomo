import type { ClazzInfo, MethodInfo, ControllerInfo, PathObject } from "../types";
import type { BaseControllerConstructor } from "../core/BaseController";

const ControllerMap = new Map<BaseControllerConstructor, ClazzInfo>();
/**
 * set controller info
 * @param clazzName controller name
 * @param methodName controller method name
 * @param info controller info
 */
function setController(
  clazz: BaseControllerConstructor,
  methodName: string | symbol | null,
  info: ControllerInfo
): void {
  const clazzInfo = ControllerMap.get(clazz) || ({} as ClazzInfo);

  const { clazzName, rootPath, path, methodTypes = [], inside, argProps, argIndex, argDecorator } = info;

  if (clazzName) clazzInfo.name = clazzName;

  if (rootPath) clazzInfo.path = rootPath;

  if (methodName) {
    const methodMap = clazzInfo.methodMap || new Map();
    const methodInfo =
      methodMap.get(methodName) ||
      ({
        name: methodName,
        args: [],
        paths: [],
      } as MethodInfo);

    methodInfo.inside = inside !== undefined ? inside : methodInfo.inside;

    if (path) {
      const pathObj = { path } as PathObject;

      if (methodTypes.length > 0) pathObj.methodTypes = methodTypes;

      methodInfo.paths.push(pathObj);
    }

    if (argDecorator) {
      methodInfo.args.push({
        argDecorator,
        argProps,
        argIndex,
      });
    }

    methodMap.set(methodName, methodInfo);
    clazzInfo.methodMap = methodMap;
  }

  ControllerMap.set(clazz, { clazz, ...clazzInfo });
}

function getController(clazz: BaseControllerConstructor): ClazzInfo {
  return ControllerMap.get(clazz) as ClazzInfo;
}

function all(): ClazzInfo[] {
  return Array.from(ControllerMap.values());
}
export default {
  setController,
  getController,
  all,
};
