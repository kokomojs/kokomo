import { isString, isObject } from "../utils";

import type { Context as KoaContext } from "koa";
import type { BaseContext, KokomoContext } from "../types";

export const Context: ThisType<BaseContext & KoaContext> = {
  send(val: string | Buffer, status?: number) {
    if (status) this.status = status;
    this.body = val;
  },

  json(data: Record<string, unknown>) {
    this.type = "application/json";
    this.body = data;
  },

  get userAgent() {
    return this.header["user-agent"];
  },

  param: {},

  setHeader(name: string | { [key: string]: string }, value?: string | string[]): void {
    const ctx = this as KokomoContext;

    if (ctx.res.headersSent) {
      console.error(new Error(`Cannot set headers after they are sent to the client, url: ${ctx.url}`));

      return;
    }

    if (isString(name) && value !== undefined) {
      ctx.set(name, value);
    }

    if (isObject(name)) {
      ctx.set(name);
    }
  },

  getHeader(name: string | any): any {
    return this.header[name.toLowerCase()];
  },
};
