import { BaseService } from "../../../../src";
class TestService1 extends BaseService {
  returnFrameName(): string {
    return `Hi, TestService!`;
  }
}
export default TestService1;
