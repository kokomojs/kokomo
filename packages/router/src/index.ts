import debugCreater from "debug";
import { replaceTailSlash } from "./helper";
import Router from "./router";

import type { Context, Next, Middleware } from "koa";
import type { HTTPMethod } from "find-my-way";
import type { RouterOptions } from "./types/RouterOptions";

const debug = debugCreater("@kokomo/router:index");

function createRouter(options: RouterOptions): Middleware {
  const { config, controllers } = options;
  const router = new Router(config);

  const ALLROUTE: string[] = [];

  for (const controller of controllers) {
    const { name: clazzName, clazz, path: rootPath, methodMap } = controller;
    const decoratorMethodNameArr: string[] = [...methodMap.values()].map(m => m.name);
    const methodNameArr: (string | number | symbol)[] = Reflect.ownKeys(clazz.prototype).filter(
      name =>
        name !== "constructor" &&
        !decoratorMethodNameArr.includes(String(name)) &&
        typeof clazz.prototype[`${String(name)}`] === "function"
    );
    // 记录没有被修饰过的路由 默认路由 controller/method
    methodNameArr.forEach(methodName => {
      ALLROUTE.push(`/${clazzName}/${String(methodName)}`);
    });

    // 主要是对被@Path修饰过的路由进行处理
    for (const [methodName, methodInfo] of methodMap) {
      const { paths } = methodInfo;
      for (const { path, methodTypes } of paths) {
        if (!path) continue;
        // 路由访问地址为class中的Path修饰地址 + method的Path修饰地址
        const routePath = replaceTailSlash(rootPath ? rootPath + path : path) || "/";

        if (!ALLROUTE.includes(String(routePath))) {
          debug(`[${methodTypes ? methodTypes.join() : "ALL"}]:${routePath} ===> ${clazzName}.${methodName}`);
          ALLROUTE.push(routePath);
        } else {
          // 注册路由重复
          console.error(`${routePath} ==> ${clazzName}.${methodName} has been registered.
          Recommended use the Path decorator to annotate the ${clazzName}.controller.ts`);
          continue;
        }
        if (!methodTypes) continue;
        for (const method of methodTypes) {
          // 根据@Path，注册路由
          router.on(method as HTTPMethod, routePath, callMethod(clazz, methodName));
        }
      }
    }
  }
  return router.routes();
}

/**
 * 调用方法
 */
function callMethod(clazz: any, methodName: string) {
  return async (ctx: Context, next: Next) => {
    // 实例化 Controller
    const instance = Reflect.construct(clazz, [ctx]);
    const method = Reflect.get(instance, methodName);

    if (typeof method !== "function") return next();

    await Promise.resolve(Reflect.apply(method, instance, [ctx, next]));
  };
}

export { createRouter };
