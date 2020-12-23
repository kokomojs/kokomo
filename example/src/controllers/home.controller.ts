import { BaseController, GET } from "kokomo";

class HomeController extends BaseController {
  @GET("/")
  index() {
    this.ctx.body = "<h1> hello, world1 </h1>";
  }
}
export default HomeController;
