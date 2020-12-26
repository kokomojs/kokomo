import Kokomo from "./core/Kokomo";
import BaseService from "./core/BaseService";
import BaseController, { BaseControllerConstructor } from "./core/BaseController";
import type { Next } from "koa";

export default Kokomo;

export { Kokomo, BaseService, BaseController, BaseControllerConstructor };

export { Path, GET, POST } from "./decorators/Path";
export { Service } from "./decorators/Service";
export { Aspect } from "./decorators/Aspect";
export { Provide } from "./decorators/Provide";
export { Inject } from "./decorators/Inject";

export { createArgDecorator, Param, Query, Context } from "./decorators/Args";

export { ClazzInfo, KokomoContext, KokomoRequest, KokomoResponse, KokomoAspect } from "./types";
export { Next };
