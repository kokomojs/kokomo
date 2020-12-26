import { KokomoAspect } from "kokomo";

export default class implements KokomoAspect {
  before() {
    console.log("test2 before");
  }
}
