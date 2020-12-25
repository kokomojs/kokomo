import { BaseController } from "../../../../src";

class HelloController1 extends BaseController {
  sayHello(): void {
    this.ctx.json({
      code: 0,
      mes: "",
      data: "6666",
    });
  }
}

export default HelloController1;
