import Kokomo from "./core/Kokomo";
import BaseService from "./core/BaseService";
import BaseController, { BaseControllerConstructor } from "./core/BaseController";
import type { Next } from "koa";

export default Kokomo;

export { Kokomo, BaseService, BaseController, BaseControllerConstructor };

export { Path, GET, POST } from "./decorators/Path";
export { Service } from "./decorators/Service";

export { ClazzInfo, KokomoContext, KokomoRequest, KokomoResponse } from "./types";
export { Next };
