import type { Request } from "koa";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseRequest {}
export interface KokomoRequest extends Request, BaseRequest {}
