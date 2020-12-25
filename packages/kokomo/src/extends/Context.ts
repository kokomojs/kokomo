import { isString, isObject } from "../utils";

import type { BaseContext, KokomoContext } from "../types";

export const Context: BaseContext = {
  send(this: KokomoContext, val: string | Buffer, status?: number): void {
    if (status) this.status = status;
    this.body = val;
  },

  json(this: KokomoContext, data: Record<string, unknown>): void {
    this.type = "application/json";
    this.body = data;
  },

  get userAgent() {
    return (this as KokomoContext).header["user-agent"];
  },

  params: {},
  plugins: {},
  setHeader(this: KokomoContext, name: string | { [key: string]: string }, value?: string | string[]): void {
    if (this.res.headersSent) {
      console.error(new Error(`Cannot set headers after they are sent to the client, url: ${this.url}`));

      return;
    }

    if (isString(name) && value !== undefined) {
      this.set(name, value);
    }

    if (isObject(name)) {
      this.set(name);
    }
  },

  getHeader(this: KokomoContext, name: string | any): any {
    return this.header[name.toLowerCase()];
  },
};
