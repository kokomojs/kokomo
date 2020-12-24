import debugCreater from "debug";
import { ControllerStore } from "../store";
import { isString, isObject } from "../utils";
import { RequestMethod } from "../config";

import type { PathParamterObject } from "../types";

const debug = debugCreater("kokomo:@Path");
/**
 * 路由装饰器
 * 可以装饰 class，作为根路由，只装饰 class 不生效，必须和 method 装饰配合使用
 * 可以装饰 method，没有根路由的时候直接作为路由使用，有跟路由的时候和跟路由组合使用
 * @param args 路由参数
 * eg:
 * Path('/p1')
 * Path('/p1', '/p2')
 * Path({ value: '/p1' })
 * Path({ value: '/p1', method: RequestType.GET })
 * Path({ value: ['/p1', '/p2'], method: RequestType.GET })
 * Path({ value: ['/p1', '/p2'], method: [RequestType.GET, RequestType.POST] })
 */
export function Path(...args: string[] | PathParamterObject[]) {
  return (...props: any[]) => {
    // 类
    if (props.length === 1) {
      if (args.length > 1) {
        throw new Error("@Path only receivew one (string) parameter when decorate class as root route");
      }
      const [rootPath] = args;
      if (!isString(rootPath) || !rootPath.startsWith("/")) {
        throw new Error(`Path must be string start with "/", now is "${rootPath}"!`);
      }
      if (rootPath === "/") {
        throw new Error(`The root path cannot be "/", now is "${rootPath}"!`);
      }
      debug(`[@Path] ===> find class decorator @Path("${rootPath}")`);
      return ControllerStore.setController(props[0], null, { rootPath: rootPath });
    }
    // 类方法
    const [path] = args;

    const values = [] as string[];
    const methodTypes = [] as string[];
    // 统计 path 和 methodType
    if (args.length === 0) {
      values.push("/");
    } else if (isObject(path)) {
      if (args.length > 1) {
        throw new Error("@Path only receive one Object as a parameter!");
      }
      const { value = "/", method = [] } = path;
      values.push(...(Array.isArray(value) ? value : [value]));
      methodTypes.push(...(Array.isArray(method) ? method : [method]));
    } else {
      args.forEach((arg: PathParamterObject | string) => {
        if (isObject(arg)) return console.log("@Path only receive one Object as a parameter!");
        if (isString(arg)) values.push(arg);
      });
    }

    const [target, methodName] = props;
    if (!isString(methodName)) return;
    if (values.length > 0) {
      values.forEach(p => {
        if (!isString(p) || !p.startsWith("/")) throw new Error(`Path must be string start with "/", now is "${p}"!`);
        debug(`[@Path] ===> find method decorator @Path("${p}")`);
        ControllerStore.setController(target.constructor, methodName, { path: p, methodTypes });
      });
    } else {
      ControllerStore.setController(target.constructor, methodName, { methodTypes });
    }
  };
}

/**
 * GET方法路由装饰器
 * 装饰 method，没有根路由的时候直接作为路由使用，有根路由的时候和根路由组合使用
 * @param args 路由参数
 * eg:
 * Path('/p1')
 * Path('/p1', '/p2')
 */
export function GET(...args: string[]) {
  return (...props: any[]) => {
    // 类
    if (props.length === 1) throw new Error("@GET can only be used on class methods!");
    // 类方法
    if (args.length === 0) throw new Error("@GET must have at least one string parameter!");

    const pathValues = [] as string[];
    for (const arg of args) {
      if (!isString(arg)) {
        console.log("@GET only receive string parameters!");
        continue;
      }
      pathValues.push(arg);
    }
    const [target, methodName] = props;
    if (!isString(methodName)) return;
    if (pathValues.length > 0) {
      for (const path of pathValues) {
        debug(`[@GET] ===> find method decorator @GET("${path}")`);
        ControllerStore.setController(target.constructor, methodName, { path, methodTypes: [RequestMethod.GET] });
      }
    }
  };
}

/**
 * POST方法路由装饰器
 * 装饰 method，没有根路由的时候直接作为路由使用，有根路由的时候和根路由组合使用
 * @param args 路由参数
 * eg:
 * Path('/p1')
 * Path('/p1', '/p2')
 */
export function POST(...args: string[]) {
  return (...props: any[]) => {
    // 类
    if (props.length === 1) throw new Error("@POST can only be used on class methods!");
    // 类方法
    if (args.length === 0) throw new Error("@POST must have at least one string parameter!");

    const pathValues = [] as string[];
    for (const arg of args) {
      if (!isString(arg)) {
        console.log("@POST only receive string parameters!");
        continue;
      }
      pathValues.push(arg);
    }
    const [target, methodName] = props;
    if (!isString(methodName)) return;
    if (pathValues.length > 0) {
      for (const path of pathValues) {
        debug(`[@POST] ===> find method decorator @POST("${path}")`);
        ControllerStore.setController(target.constructor, methodName, { path, methodTypes: [RequestMethod.POST] });
      }
    }
  };
}
