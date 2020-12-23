import type { KokomoContext, KokomoRequest, KokomoResponse } from "../types";

class BaseController {
  req: KokomoRequest;
  res: KokomoResponse;
  constructor(readonly ctx: KokomoContext) {
    const { request: req, response: res } = ctx;

    this.req = req;
    this.res = res;
  }
  get param() {
    return this.ctx.param;
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
