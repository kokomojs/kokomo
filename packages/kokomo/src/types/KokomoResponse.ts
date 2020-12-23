import type { Response } from "koa";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseResponse {}
export interface KokomoResponse extends Response, BaseResponse {}
