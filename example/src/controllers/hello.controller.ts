import { BaseController, GET } from "kokomo";
import type { KokomoContext, Next } from "kokomo";

class HelloController extends BaseController {
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
