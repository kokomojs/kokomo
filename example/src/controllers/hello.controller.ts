import { BaseController, GET, Service } from "kokomo";
import type { KokomoContext, Next } from "kokomo";

import TestService from "../services/test.service";
class HelloController extends BaseController {
  @Service("test")
  public testService!: TestService;

  @GET("/hello")
  sayHello(): void {
    this.ctx.json({
      code: 0,
      mes: "",
      data: "6666",
    });
  }
  sayHello1(ctx: KokomoContext, next: Next): void {
    ctx.body = "<h1> hello, world1 </h1>";
    next();
  }
}

export default HelloController;
