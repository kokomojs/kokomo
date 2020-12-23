import { BaseResponse } from "../types";
import type { Response as KoaResponse } from "koa";

export const Response: ThisType<BaseResponse & KoaResponse> = {};
