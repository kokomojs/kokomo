import type { KokomoContext } from "../types";
class BaseService {
  constructor(readonly ctx: KokomoContext) {}
}

export interface BaseServiceConstructor {
  new (): BaseService;
}
export default BaseService;
