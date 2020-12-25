import { BaseController, GET, Service, Param, Query } from "kokomo";
import TestService from "../services/test.service";

class HomeController extends BaseController {
  @Service("test")
  public testService!: TestService;
  @GET("/")
  async index(): Promise<void> {
    this.ctx.body = this.testService.returnFrameName();
  }
  @GET("/home/:name")
  home(@Param("name") name: string, @Query("title") title: string): void {
    console.log(this.params);
    this.ctx.body = `name=${name}, title=${title}`;
  }
}
export default HomeController;
