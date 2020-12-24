import type { Context } from "koa";

import { KokomoRequest } from "./KokomoRequest";
import { KokomoResponse } from "./KokomoResponse";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseContext {
  /**
   * 发送内容
   * @param data 内容
   * @param status 状态码
   */
  send(data: string, status?: number): void;

  /**
   * 发送json
   * @param data json内容
   */
  json(data: Record<string, unknown>): void;

  /**
   * userAgent
   */
  userAgent: string;

  /**
   * 路由参数
   */
  param: Record<string, any>;

  /**
   * 插件
   */
  plugins: Record<string, any>;

  /**
   * 设置 header
   * @param name header 名称
   * @param value header 值
   */
  setHeader(name: string | any, value?: string | string[]): void;

  /**
   * 获取 header
   * @param name header 名称
   */
  getHeader(name: string | any): any;
}

export interface KokomoContext extends Context, BaseContext {
  request: KokomoRequest;
  response: KokomoResponse;
}
