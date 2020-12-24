import { BaseController, GET, Aspect } from "kokomo";

class HomeController extends BaseController {
  @Aspect.before("test2")
  @GET("/")
  index(): void {
    console.log(111);
    this.ctx.body = "<h1> hello, world1 </h1>";
  }
}
export default HomeController;
