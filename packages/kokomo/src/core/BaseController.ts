import type { KokomoContext, KokomoRequest, KokomoResponse } from "../types";

class BaseController {
  req: KokomoRequest;
  res: KokomoResponse;
  constructor(readonly ctx: KokomoContext) {
    const { request: req, response: res } = ctx;

    this.req = req;
    this.res = res;
  }
  get param(): Record<string, any> {
    return this.ctx.param;
  }

  get plugins(): Record<string, any> {
    return this.ctx.plugins;
  }

  setHeader(name: string | any, value: string | string[]): void {
    this.ctx.setHeader(name, value);
  }

  getHeader(name: string | any): any {
    return this.ctx.getHeader(name);
  }
}

export interface BaseControllerConstructor {
  new (ctx: KokomoContext): BaseController;
}

export default BaseController;
