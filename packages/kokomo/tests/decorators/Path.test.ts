import { BaseController, Path } from "../../src";

@Path("/test")
class TestController extends BaseController {
  @Path("/hello")
  hello() {
    this.ctx.body = "hello";
  }
}
