import { BaseController, GET } from "kokomo";
import type { KokomoContext, Next } from "kokomo";
class HomeController extends BaseController {
  @GET("/")
  async index(): Promise<void> {
    this.ctx.body = "<h1> hello, world1 </h1>";
  }
}
export default HomeController;
