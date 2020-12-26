import { KokomoAspect } from "kokomo";

export default class implements KokomoAspect {
  before() {
    console.log("test before");
  }
  async around(proceedPoint: any) {
    console.log("test before");
    await proceedPoint.proceed();
    console.log("test after");
  }
}
