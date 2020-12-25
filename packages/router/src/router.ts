import { METHODS } from "http";
import compose from "koa-compose";
import FindMyWay from "find-my-way";

import type { Middleware, Context, Next } from "koa";
import type { Config, HTTPVersion, HTTPMethod, Handler } from "find-my-way";

class Router<T extends HTTPVersion = HTTPVersion.V1> {
  fmw: FindMyWay.Instance<T>;
  [key: string]: any;
  constructor(options?: Config<T>) {
    this.fmw = FindMyWay(options);

    METHODS.forEach((m: string) => {
      this[m.toLowerCase()] = (path: string, ...middlewares: Middleware[]) =>
        Router.prototype.on(m as HTTPMethod, path, ...middlewares);
    });

    ["off", "reset", "prettyPrint", "find"].forEach((m: string) => {
      this[m] = (this.fmw as any)[m].bind(this);
    });
  }
  on(method: HTTPMethod, path: string, ...middlewares: Middleware[]): Router<T> {
    let store;
    if (middlewares.length > 1 && typeof middlewares[middlewares.length - 1] === "object") {
      store = middlewares.pop();
    }
    this.fmw.on(method, path, (compose(middlewares) as unknown) as Handler<T>, store);
    return this;
  }
  routes(): Middleware {
    return async (ctx: Context, next: Next) => {
      const handle = this.fmw.find(ctx.method as HTTPMethod, ctx.path);
      if (!handle) {
        return (this.fmw as any).defaultRoute && (this.fmw as any).defaultRoute(ctx, next);
      }
      ctx.params = handle.params;
      ctx.store = handle.store;
      await ((handle.handler as unknown) as Middleware)(ctx, next);
    };
  }
}

export default Router;
