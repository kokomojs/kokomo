import { BaseController, GET } from "kokomo";
import type { KokomoContext, Next } from "kokomo";
class HomeController extends BaseController {
  @GET("/")
  async index(ctx: KokomoContext, next: Next): Promise<void> {
    console.log(this.plugins.now());
    this.ctx.body = "<h1> hello, world1 </h1>";
    await next();
  }
}
export default HomeController;
