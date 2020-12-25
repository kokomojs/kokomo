import { BaseController, GET, Service } from "kokomo";

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
}

export default HelloController;
