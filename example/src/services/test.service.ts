import { BaseService, Inject } from "kokomo";
import UserModel from "../model/User";
class TestService extends BaseService {
  @Inject("User")
  user!: UserModel;
  @Inject(UserModel, "", 22)
  user1!: UserModel;
  returnFrameName(): string {
    return `Hi, ${this.user.name}, ${this.user1.age} !`;
  }
}
export default TestService;
